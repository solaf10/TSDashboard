import axios from "axios";
import ItemForm from "../components/ItemForm/ItemForm";
import config from "../Constants/enviroments";
import type { FormEvent, RefObject } from "react";
import type { AddedProductInfo } from "../interfaces/interfaces";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditItem = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  function sendData(
    event: FormEvent,
    enteredData: RefObject<AddedProductInfo>
  ) {
    event.preventDefault();
    axios
      .post(
        config.baseUrl + config.items + `/${id}`,
        { ...enteredData.current, _method: "PUT" },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success("Product edited successfully!");
        navigate("/dashboard");
      })
      .catch((err) => {
        toast.error("Failed to edit product!");
        console.log(err);
      });
  }
  return (
    <div className="control-products content">
      <p>Edit Product</p>
      <ItemForm sendData={sendData} id={id} />
    </div>
  );
};

export default EditItem;
