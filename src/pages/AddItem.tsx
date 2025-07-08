import { type FormEvent, type RefObject } from "react";
import ItemForm from "../components/ItemForm/ItemForm";
import type { AddedProductInfo } from "../interfaces/interfaces";
import axios from "axios";
import config from "../Constants/enviroments";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddItem = () => {
  const navigate = useNavigate();
  function sendData(
    event: FormEvent,
    enteredData: RefObject<AddedProductInfo>
  ) {
    event.preventDefault();
    axios
      .post(config.baseUrl + config.items, enteredData.current, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Product added successfully!");
        navigate("/dashboard");
      })
      .catch((err) => {
        toast.error("Failed to add product!");
        console.log(err);
      });
  }
  return (
    <div className="control-products content">
      <p>Add Product</p>
      <ItemForm sendData={sendData} id="" />
    </div>
  );
};

export default AddItem;
