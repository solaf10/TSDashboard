import React, { type Dispatch, type SetStateAction } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { FaPowerOff } from "react-icons/fa";
import { GrFavorite } from "react-icons/gr";
import { IoClose, IoHome } from "react-icons/io5";
import { TbListCheck } from "react-icons/tb";
import { NavLink, useNavigate } from "react-router-dom";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsShow: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ isOpen, setIsOpen, setIsShow }: Props) => {
  const navigate = useNavigate();
  return (
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
  );
};

export default Sidebar;
