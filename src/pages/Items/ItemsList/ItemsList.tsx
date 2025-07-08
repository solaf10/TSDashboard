import "./ItemsList.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSearchKeys } from "../../../contexts/SearchContext";
import config from "../../../Constants/enviroments";
import Product from "../../../components/Product/Product";
import type { ProductsType } from "../../../interfaces/interfaces";
import ConfirmPopUp from "../../../components/PopUp/ConfirmPopUp";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import { toast } from "react-toastify";

const ItemsList = () => {
  const { searchedKey } = useSearchKeys();
  const [products, setProducts] = useState<Array<ProductsType>>([]);
  const [filteredProducts, setFilteredProducts] =
    useState<Array<ProductsType>>(products);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rerender, setRerender] = useState<boolean>(false);

  const deletedProductID = useRef<number | null>(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(config.baseUrl + config.items, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setIsLoading(false);
        setProducts(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [rerender]);
  useEffect(() => {
    if (searchedKey != "") {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchedKey.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [searchedKey, products]);

  const handleOpenPopUp = (id: number) => {
    deletedProductID.current = id;
    setIsShow(true);
  };
  const handleDelete = () => {
    axios
      .delete(config.baseUrl + config.items + `/${deletedProductID.current}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setRerender((prev) => !prev);
        setIsShow(false);
        toast.success("Product deleted successfully!");
      })
      .catch((err) => {
        toast.error("Failed to delete product!");
        console.log(err);
      });
  };
  const cards = filteredProducts.map((product) => (
    <Product
      key={product.id}
      id={product.id}
      name={product.name}
      price={product.price}
      image={product.image_url}
      handleOpenPopUp={handleOpenPopUp}
    />
  ));
  return (
    <>
      <header>
        <p>Manage Products</p>
        <Link to="/dashboard/items/add" className="main-btn">
          + Add product
        </Link>
      </header>
      <div className="cards row">
        {isLoading ? <Loader isbtn={false} /> : cards}
      </div>
      {isShow && (
        <ConfirmPopUp
          action="delete the product"
          handleCancelation={() => setIsShow(false)}
          handleAction={handleDelete}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default ItemsList;
