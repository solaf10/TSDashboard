import { useState, type FormEvent, type RefObject } from "react";
import ItemForm from "../../../components/ItemForm/ItemForm";
import type { AddedProductInfo } from "../../../interfaces/interfaces";
import axios from "axios";
import config from "../../../Constants/enviroments";
import { useNavigate } from "react-router-dom";

const AddItem = () => {
  const [data, setData] = useState<AddedProductInfo>({
    name: "",
    price: "",
    image: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  function sendData(
    event: FormEvent,
    enteredData: RefObject<AddedProductInfo>
  ) {
    event.preventDefault();
    setIsLoading(true);
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
        setIsLoading(false);
        navigate("/dashboard");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }
  return (
    <div className="control-products content">
      <p>Add Product</p>
      <ItemForm sendData={sendData} isLoading={isLoading} />
    </div>
  );
};

export default AddItem;
