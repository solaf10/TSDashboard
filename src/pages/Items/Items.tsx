import { useMode } from "../../contexts/ModeContext";
import "./Items.css";
import { Outlet } from "react-router";

const Items = () => {
  const { isDark } = useMode();
  return (
    <div className={isDark ? "items dark" : "items "}>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default Items;
