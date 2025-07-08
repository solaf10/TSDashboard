import { useEffect, useState } from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import axios from "axios";
import config from "../../Constants/enviroments";
import { Link, useNavigate } from "react-router-dom";
import "../Auth.css";
import "./Register.css";
import { IoCloudUploadOutline } from "react-icons/io5";

export interface RegisterInps {
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  profile_image: Blob | null;
}

const Register = () => {
  const [data, setData] = useState<RegisterInps>({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    profile_image: null,
  });
  const inputs = [
    {
      type: "text",
      title: "first_name",
      placeHolder: "Enter Your FirstName",
    },
    {
      type: "text",
      title: "last_name",
      placeHolder: "Enter Your LastName",
    },
    {
      type: "text",
      title: "user_name",
      placeHolder: "Enter Your FullName",
    },
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
    {
      type: "password",
      title: "password_confirmation",
      placeHolder: "Confirm Your Password",
    },
    {
      type: "file",
      title: "profile_image",
      placeHolder: "Enter Your image",
      fileLabel: (
        <>
          <IoCloudUploadOutline className="icon" />
          <span>Upload Your Image</span>
        </>
      ),
    },
  ];
  const navigate = useNavigate();
  useEffect(() => {
    if (
      data.first_name !== "" &&
      data.last_name !== "" &&
      data.user_name !== "" &&
      data.email !== "" &&
      data.password !== "" &&
      data.password_confirmation !== "" &&
      data.profile_image !== null
    ) {
      axios
        .post(config.baseUrl + config.register, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("userInfo", JSON.stringify(res.data.data.user));
          navigate("/dashboard");
        })
        .catch((err) => console.log(err));
    }
  }, [data]);
  return (
    <div className="auth register">
      <div className="intro">
        <h1>Hello, Welcome!</h1>
        <p>Allready have an Account?</p>
        <Link className="secondary-btn" to="/">
          Login
        </Link>
      </div>
      <AuthForm<RegisterInps>
        title="Register"
        btn="Register"
        inputs={inputs}
        setData={setData}
      />
    </div>
  );
};

export default Register;
