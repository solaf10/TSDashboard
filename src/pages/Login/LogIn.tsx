import "../Auth.css";
import "./Login.css";
import { useEffect, useState } from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import axios from "axios";
import config from "../../Constants/enviroments";
import type { LogInInps } from "../../interfaces/interfaces";
import { Link, useNavigate } from "react-router-dom";

const LogIn = () => {
  const [data, setData] = useState<LogInInps>({ email: "", password: "" });
  const inputs = [
    {
      type: "email",
      title: "email",
      placeHolder: "Enter Your Email",
    },
    {
      type: "password",
      title: "password",
      placeHolder: "Enter Your Password",
    },
  ];
  const navigate = useNavigate();
  useEffect(() => {
    if (data.email !== "" && data.password !== "") {
      axios
        .post(config.baseUrl + config.login, data)
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userInfo", JSON.stringify(res.data.user));
          navigate("/dashboard");
        })
        .catch((err) => console.log(err));
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
      />
    </div>
  );
};

export default LogIn;
