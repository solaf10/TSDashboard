import { useEffect, useState } from "react";
import "./Home.css";
import config from "../../Constants/enviroments";
import axios from "axios";
import type { ProductsType } from "../../interfaces/interfaces";
import Product from "../../components/Product/Product";
import Loader from "../../components/Loader/Loader";
const Home = () => {
  const userInfo = JSON.parse(localStorage?.getItem("userInfo") || "{}");
  const { first_name } = userInfo;
  const [products, setProducts] = useState<Array<ProductsType>>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
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
        const sortedProducts = res.data.sort(
          (a: ProductsType, b: ProductsType) =>
            new Date(b.created_at || "").getTime() -
            new Date(a.created_at || "").getTime()
        );
        setProducts(sortedProducts);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);
  const cards = products.slice(0, 3).map((product) => (
    <div className="product-card" key={product.id}>
      <img src={product.image_url} alt={product.name} />
      <div className="info">
        <p className="product-name">{product.name}</p>
        <p className="product-price">${product.price}</p>
      </div>
    </div>
  ));
  return (
    <div className="home">
      <div className="container">
        <div className="dashboard-stats">
          <div className="welcome">
            <div className="text">
              <h2 className="dashboard-title">Hi, {first_name}</h2>
              <p className="dashboard-desc">
                Here's a quick overview of your shop's activity.
              </p>
            </div>
            <div className="image">
              <img src="/assets/images/undraw_hello_ccwj.svg" alt="" />
            </div>
          </div>
          <div className="stats-cards">
            <div className="card">
              <p className="card-title">Total Products</p>
              <h3 className="card-number">{products.length}</h3>
            </div>
            <div className="card">
              <p className="card-title">Newly Added</p>
              <h3 className="card-number">5</h3>
            </div>
            <div className="card">
              <p className="card-title">Average Price</p>
              <h3 className="card-number">$43</h3>
            </div>
          </div>
        </div>
        <div className="recent-products">
          <div className="section-header">
            <h3>Newly Added Products</h3>
            <p>Here’s a quick look at the most recently added items.</p>
          </div>
          <div className="products-list">{cards}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
