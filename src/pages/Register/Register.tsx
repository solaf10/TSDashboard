import { useEffect, useState } from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import axios from "axios";
import config from "../../Constants/enviroments";
import { Link, useNavigate } from "react-router-dom";
import "../Auth.css";
import "./Register.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { LuEyeClosed } from "react-icons/lu";
import { FaEnvelope, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";

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
  const [isPassShow, setIsPassShow] = useState(false);
  const [isConfirmShow, setIsConfirmShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputs = [
    {
      type: "text",
      title: "first_name",
      placeHolder: "Enter Your FirstName",
      label: (
        <label className="icon-holder" htmlFor="first_name">
          <MdDriveFileRenameOutline className="icon" />
        </label>
      ),
    },
    {
      type: "text",
      title: "last_name",
      placeHolder: "Enter Your LastName",
      label: (
        <label className="icon-holder" htmlFor="last_name">
          <MdDriveFileRenameOutline className="icon" />
        </label>
      ),
    },
    {
      type: "text",
      title: "user_name",
      placeHolder: "Enter Your FullName",
      label: (
        <label className="icon-holder" htmlFor="user_name">
          <MdDriveFileRenameOutline className="icon" />
        </label>
      ),
    },
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
      type: isPassShow ? "text" : "password",
      title: "password",
      placeHolder: "Enter Your Password",
      label: (
        <label
          className="icon-holder"
          htmlFor="password"
          onClick={(e) => {
            e.preventDefault();
            setIsPassShow((prev) => !prev);
          }}
        >
          {isPassShow ? (
            <LuEyeClosed className="icon" />
          ) : (
            <FaEye className="icon" />
          )}
        </label>
      ),
    },
    {
      type: isConfirmShow ? "text" : "password",
      title: "password_confirmation",
      placeHolder: "Confirm Your Password",
      label: (
        <label
          className="icon-holder"
          htmlFor="password"
          onClick={(e) => {
            e.preventDefault();
            setIsConfirmShow((prev) => !prev);
          }}
        >
          {isConfirmShow ? (
            <LuEyeClosed className="icon" />
          ) : (
            <FaEye className="icon" />
          )}
        </label>
      ),
    },
    {
      type: "file",
      title: "profile_image",
      placeHolder: "Enter Your image",
      label: (
        <label htmlFor="profile_image" className="file-label">
          <IoCloudUploadOutline className="icon" />
          <span>Upload Your Image</span>
        </label>
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
      setIsLoading(true);
      axios
        .post(config.baseUrl + config.register, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          setIsLoading(false);
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("userInfo", JSON.stringify(res.data.data.user));
          toast.success("you created an account successfully!");
          navigate("/dashboard");
        })
        .catch((err) => {
          setIsLoading(false);
          toast.error("Failed to create account!");
          console.log(err);
        });
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
        isLoading={isLoading}
      />
    </div>
  );
};

export default Register;
