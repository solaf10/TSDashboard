import "./NavBar.css";
import { useSearchKeys } from "../../contexts/SearchContext";
import { RiSearchLine } from "react-icons/ri";
import { IoIosSunny, IoMdMoon } from "react-icons/io";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";

interface Props {
  isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const NavBar = ({ isDark, setIsDark, setIsOpen }: Props) => {
  const userInfo = JSON.parse(localStorage?.getItem("userInfo") || "{}");
  const { profile_image_url, first_name, user_name } = userInfo;
  const { setSearchedKey } = useSearchKeys();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("isDark", isDark.toString());
  }, [isDark]);
  return (
    <nav>
      <div className="container">
        <div className="menu">
          <div
            className="icon-holder"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <TiThMenu className="icon" />
          </div>
        </div>
        <div className="search">
          <RiSearchLine className="icon" />
          <input
            type="search"
            name="search"
            placeholder="Type A Keyword"
            onChange={(e) => setSearchedKey(e.target.value)}
            onFocus={() => navigate("/dashboard/items")}
          />
        </div>
        <div className="settings">
          <div className="user-info">
            <img src={profile_image_url} alt={user_name} />
            <div className="names">
              <p className="full">{user_name}</p>
              <p className="first">{first_name}</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsDark((prev) => !prev);
            }}
          >
            {isDark ? (
              <IoIosSunny className="icon" />
            ) : (
              <IoMdMoon className="icon" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
