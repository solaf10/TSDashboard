import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type RefObject,
} from "react";
import type { AddedProductInfo, PrevInfo } from "../../interfaces/interfaces";
import { IoCloudUploadOutline } from "react-icons/io5";
import "./ItemForm.css";
import { FaCheckCircle } from "react-icons/fa";

interface Props {
  isLoading: boolean;
  sendData: (e: FormEvent, enteredData: RefObject<AddedProductInfo>) => void;
  oldData?: PrevInfo;
}

const ItemForm = ({ oldData, sendData, isLoading }: Props) => {
  const data = useRef<AddedProductInfo>({ name: "", price: "", image: null });
  const [isImageChanged, setIsImageChanged] = useState<boolean>(false);
  oldData &&
    useEffect(() => {
      data.current = { ...oldData, image: null };
    }, [oldData]);
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
            defaultValue={oldData?.name}
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
            defaultValue={oldData?.price}
          />
        </div>
        <input
          className={isLoading ? "disabled main-btn" : "main-btn"}
          type="submit"
          value={isLoading ? "Wait..." : "Save"}
          disabled={isLoading}
        />
      </form>
      <div className="product-image">
        <label htmlFor="upload">
          {isImageChanged ? (
            <FaCheckCircle className="icon" style={{ fontSize: "64px" }} />
          ) : oldData?.image_url ? (
            <img src={oldData?.image_url} alt={oldData?.name} />
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
