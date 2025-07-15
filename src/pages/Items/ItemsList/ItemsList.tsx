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
    setCurrentPage(0);
  }, [searchedKey, products]);

  const handleOpenPopUp = (id: number) => {
    deletedProductID.current = id;
    setIsShow(true);
  };
  const handleDelete = () => {
    setIsLoading(true);
    axios
      .delete(config.baseUrl + config.items + `/${deletedProductID.current}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        setIsShow(false);
        setRerender((prev) => !prev);
        toast.success("Product deleted successfully!");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        toast.error("Failed to delete product!");
      });
  };
  // pagenation
  const NUM_PER_PAGE = 12;
  // const end = useRef<number>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const pagenationEnabling = () => {
    const start = currentPage * NUM_PER_PAGE;
    const end = Math.min(
      currentPage * NUM_PER_PAGE + NUM_PER_PAGE,
      filteredProducts.length
    );
    return filteredProducts
      .slice(start, end)
      .map((product) => (
        <Product
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.image_url}
          handleOpenPopUp={handleOpenPopUp}
        />
      ));
  };
  const cards = pagenationEnabling();
  return (
    <>
      <header>
        <p>Manage Products</p>
        <Link to="/dashboard/items/add" className="main-btn">
          + Add product
        </Link>
      </header>
      <div className="cards">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="row">{cards}</div>
            <div className="pagenation-btns">
              {/* <button
          className="prev"
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev &gt;{" "}
        </button> */}
              {[...new Array(currentPage + 1)].map((_, i) => (
                <button
                  key={i}
                  className={i == currentPage ? "active pageNum" : "pageNum"}
                  onClick={() => setCurrentPage(i)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className={
                  currentPage + 1 >=
                  Math.ceil(filteredProducts.length / NUM_PER_PAGE)
                    ? "disabled next"
                    : "next"
                }
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                <span>Next</span>
                <span>&gt;</span>
              </button>
            </div>
          </>
        )}
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
