import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type RefObject,
} from "react";
import type { AddedProductInfo, PrevInfo } from "../../interfaces/interfaces";
import { IoCloudUploadOutline } from "react-icons/io5";
import "./ItemForm.css";
import { useNavigate } from "react-router-dom";

interface Props {
  isLoading: boolean;
  sendData: (e: FormEvent, enteredData: RefObject<AddedProductInfo>) => void;
  oldData?: PrevInfo;
}

const ItemForm = ({ oldData, sendData, isLoading }: Props) => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const data = useRef<AddedProductInfo>({ name: "", price: "", image: null });
  oldData &&
    useEffect(() => {
      data.current = { ...oldData, image: null };
    }, [oldData]);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    inputType: string
  ) => {
    data.current = { ...data.current, [inputType]: e.target.value };
    setIsChanged(true);
  };
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    data.current = { ...data.current, image: e?.target?.files?.[0] };
    setSelectedImage(URL.createObjectURL(e?.target?.files?.[0]));
    setIsChanged(true);
  };
  return (
    <div className="holder">
      <form
        onSubmit={(event) => {
          !isChanged ? navigate("/dashboard/items") : sendData(event, data);
        }}
      >
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
            required
          />
        </div>
        <div className="price">
          <label htmlFor="price">Product Price:</label>
          <input
            type="text"
            id="price"
            placeholder="Enter Product Price"
            onChange={(e) => handleChange(e, "price")}
            defaultValue={oldData?.price}
            required
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
          {selectedImage != "" ? (
            // <FaCheckCircle className="icon" style={{ fontSize: "64px" }} />
            <img src={selectedImage} alt={data.current.name} />
          ) : oldData?.image_url ? (
            <img src={oldData?.image_url} alt={oldData?.name} />
          ) : (
            <IoCloudUploadOutline className="icon" />
          )}
          <span>{selectedImage != "" ? "Image Uploaded" : "Upload Image"}</span>
        </label>
        <input
          className="upload-input"
          id="upload"
          type="file"
          onChange={(e) => {
            handleImage(e);
          }}
          required={oldData ? false : true}
        />
      </div>
    </div>
  );
};

export default ItemForm;
