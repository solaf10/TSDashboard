import "./Dashboard.css";
import axios from "axios";
import config from "../Constants/enviroments";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import SearchContext from "../contexts/SearchContext";
import { IoClose, IoHome } from "react-icons/io5";
import { useEffect, useState } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { GrFavorite } from "react-icons/gr";
import { TbListCheck } from "react-icons/tb";
import { FaPowerOff } from "react-icons/fa";
import ConfirmPopUp from "../components/PopUp/ConfirmPopUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Root = () => {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(() =>
    window.innerWidth >= 991 ? true : false
  );
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  function handleLogOut() {
    setIsLoading(true);
    axios
      .post(
        config.baseUrl + config.logout,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        navigate("/");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }
  return (
    <SearchContext>
      <div className={isDark ? "page dark" : "page"}>
        <ToastContainer position="top-right" autoClose={3000} />
        <aside style={{ left: isOpen ? "0px" : "-100%" }}>
          <div className="content">
            <div className="holder">
              <div className="header">
                <h1 className="logo" onClick={() => navigate("/products")}>
                  <span>Dash</span>
                  <span className="colored">Stack</span>
                </h1>
                <div className="close-holder">
                  <IoClose className="close" onClick={() => setIsOpen(false)} />
                </div>
              </div>
              <ul>
                <li>
                  <NavLink to="/dashboard" end>
                    <IoHome />
                    <p>Dashboard</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/items">
                    <AiOutlineProduct />
                    <p>Products</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/favorites">
                    <GrFavorite />
                    <p>Favorites</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/orders">
                    <TbListCheck />
                    <p>Order Lists</p>
                  </NavLink>
                </li>
              </ul>
            </div>
            <button onClick={() => setIsShow(true)}>
              <FaPowerOff />
              <span>Logout</span>
            </button>
          </div>
        </aside>
        <main>
          <NavBar isDark={isDark} setIsDark={setIsDark} />
          <div className="main-content">
            <Outlet />
          </div>
        </main>
        {isShow && (
          <ConfirmPopUp
            action="Logout"
            handleCancelation={() => setIsShow(false)}
            handleAction={handleLogOut}
            isLoading={isLoading}
          />
        )}
      </div>
    </SearchContext>
  );
};

export default Root;
