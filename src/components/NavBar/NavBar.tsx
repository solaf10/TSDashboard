import "./NavBar.css";
import { useSearchKeys } from "../../contexts/SearchContext";
import { RiSearchLine } from "react-icons/ri";
import { IoIosSunny, IoMdMoon } from "react-icons/io";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
}

const NavBar = ({ isDark, setIsDark }: Props) => {
  const userInfo = JSON.parse(localStorage?.getItem("userInfo") || "{}");
  const { profile_image_url, first_name, user_name } = userInfo;
  const { setSearchedKey } = useSearchKeys();
  return (
    <nav>
      <div className="container">
        <div className="search">
          <RiSearchLine className="icon" />
          <input
            type="search"
            name="search"
            placeholder="Type A Keyword"
            onChange={(e) => setSearchedKey(e.target.value)}
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
          <button onClick={() => setIsDark((prev) => !prev)}>
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
