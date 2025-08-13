import axios from "axios";
import ItemForm from "../components/ItemForm/ItemForm";
import config from "../Constants/enviroments";
import { useState, type FormEvent, type RefObject } from "react";
import type { AddedProductInfo, PrevInfo } from "../interfaces/interfaces";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditItem = () => {
  const [isLoading, setIsLoading] = useState(false);
  const prevInfo = useLoaderData<PrevInfo>();
  const navigate = useNavigate();
  const id = useParams().id;
  function sendData(
    event: FormEvent,
    enteredData: RefObject<AddedProductInfo>
  ) {
    event.preventDefault();
    setIsLoading(true);
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
        setIsLoading(false);
        toast.success("Product edited successfully!");
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        toast.error("Failed to edit product!");
      });
  }
  // fetch old data
  /* const [prevInfo, setPrevInfo] = useState<PrevInfo>({
    name: "",
    price: "",
    image_url: "",
  }); */
  /* useEffect(() => {
    axios
      .get(`https://vica.website/api/items/${id}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res.data);
        setPrevInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, []); */
  return (
    <div className="control-products content">
      <p>Edit Product</p>
      <ItemForm sendData={sendData} oldData={prevInfo} isLoading={isLoading} />
    </div>
  );
};

export default EditItem;
