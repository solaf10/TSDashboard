import "./Dashboard.css";
import axios from "axios";
import config from "../Constants/enviroments";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import SearchContext from "../contexts/SearchContext";
import { useEffect, useState } from "react";
import ConfirmPopUp from "../components/PopUp/ConfirmPopUp";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../components/Sidebar/Sidebar";

const Root = () => {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(() =>
    window.innerWidth >= 768 ? true : false
  );
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("isDark") == "true";
  });

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
        toast.success("you logged out successfully!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error("Failed to logout!");
        console.log(err);
      });
  }
  return (
    <SearchContext>
      <div className={isDark ? "page dark" : "page"}>
        <ToastContainer position="top-right" autoClose={3000} />
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} setIsShow={setIsShow} />
        <main>
          <NavBar isDark={isDark} setIsDark={setIsDark} setIsOpen={setIsOpen} />
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
