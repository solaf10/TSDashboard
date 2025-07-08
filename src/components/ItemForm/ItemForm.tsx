import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type RefObject,
} from "react";
import type { AddedProductInfo } from "../../interfaces/interfaces";
import { IoCloudUploadOutline } from "react-icons/io5";
import "./ItemForm.css";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";

interface Props {
  id: string | null;
  sendData: (e: FormEvent, enteredData: RefObject<AddedProductInfo>) => void;
}

const ItemForm = ({ id, sendData }: Props) => {
  const data = useRef<AddedProductInfo>({ name: "", price: "", image: null });
  const [isImageChanged, setIsImageChanged] = useState<boolean>(false);
  const [prevInfo, setPrevInfo] = useState({
    name: "",
    price: "",
    image_url: "",
  });
  id !== "" &&
    useEffect(() => {
      axios
        .get(`https://vica.website/api/items/${id}`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          console.log(res.data);
          setPrevInfo(res.data);
          const { name, price } = res.data;
          data.current = { image: null, name, price };
        })
        .catch((err) => console.log(err));
    }, [id]);
  return (
    <div className="holder">
      <form onSubmit={(event) => sendData(event, data)}>
        <div className="name">
          <label htmlFor="product-name">Product Name:</label>
          <input
            type="text"
            id="product-name"
            placeholder="Enter Product Name"
            onChange={(e) =>
              (data.current = { ...data.current, name: e.target.value })
            }
            defaultValue={id !== "" ? prevInfo.name : ""}
          />
        </div>
        <div className="price">
          <label htmlFor="price">Product Price:</label>
          <input
            type="text"
            id="price"
            placeholder="Enter Product Price"
            onChange={(e) =>
              (data.current = { ...data.current, price: e.target.value })
            }
            defaultValue={id !== "" ? prevInfo.price : ""}
          />
        </div>
        <input className="main-btn" type="submit" value="Save" />
      </form>
      <div className="product-image">
        <label htmlFor="upload">
          {isImageChanged ? (
            <FaCheckCircle className="icon" style={{ fontSize: "64px" }} />
          ) : prevInfo.image_url !== "" ? (
            <img src={prevInfo.image_url} alt={prevInfo.name} />
          ) : (
            <IoCloudUploadOutline className="icon" />
          )}
          <span>{isImageChanged ? "Image Uploaded" : "Upload Image"}</span>
        </label>
        <input
          className="upload-input"
          id="upload"
          type="file"
          onChange={(e) => {
            setIsImageChanged(true);
            data.current = { ...data.current, image: e?.target?.files?.[0] };
          }}
        />
      </div>
    </div>
  );
};

export default ItemForm;
