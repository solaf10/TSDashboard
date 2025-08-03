import "../Auth.css";
import "./Login.css";
import { useEffect, useState } from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import axios from "axios";
import config from "../../Constants/enviroments";
import type { LogInInps } from "../../interfaces/interfaces";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaEye } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";
import { toast } from "react-toastify";

const LogIn = () => {
  const [data, setData] = useState<LogInInps>({ email: "", password: "" });
  const [isShow, setIsShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputs = [
    {
      type: "email",
      title: "email",
      placeHolder: "Enter Your Email",
      label: (
        <label className="icon-holder" htmlFor="email">
          <FaEnvelope className="icon" />
        </label>
      ),
    },
    {
      type: isShow ? "text" : "password",
      title: "password",
      placeHolder: "Enter Your Password",
      label: (
        <label
          className="icon-holder"
          htmlFor="password"
          onClick={(e) => {
            e.preventDefault();
            setIsShow((prev) => !prev);
          }}
        >
          {isShow ? (
            <LuEyeClosed className="icon" />
          ) : (
            <FaEye className="icon" />
          )}
        </label>
      ),
    },
  ];
  const navigate = useNavigate();
  useEffect(() => {
    if (data.email !== "" && data.password !== "") {
      setIsLoading(true);
      axios
        .post(config.baseUrl + config.login, data)
        .then((res) => {
          console.log(res.data);
          setIsLoading(false);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userInfo", JSON.stringify(res.data.user));
          toast.success("you logged in successfully!");
          navigate("/dashboard");
        })
        .catch((err) => {
          setIsLoading(false);
          toast.error("Failed to login!");
          console.log(err);
        });
    }
  }, [data]);
  return (
    <div className="auth login">
      <div className="intro">
        <h1>Hello, Welcome!</h1>
        <p>Don't have an Account?</p>
        <Link className="secondary-btn" to="/register">
          Register
        </Link>
      </div>
      <AuthForm<LogInInps>
        title="Login"
        btn="Login"
        inputs={inputs}
        setData={setData}
        isLoading={isLoading}
      />
    </div>
  );
};

export default LogIn;
