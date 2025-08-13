import { useNavigate } from "react-router";
import "./Product.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";

interface Props {
  id: number;
  name: string;
  price: number;
  image: string;
  handleOpenPopUp: (id: number) => void;
}

const Product = ({ id, name, price, image, handleOpenPopUp }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleNavigate = () => {
    setIsLoading(true);
    navigate(`/dashboard/items/edit/${id}`);
  };
  return (
    <div className="card-holder col-lg-3">
      <div className="card">
        <div className="image">
          <img src={image} alt={name} />
        </div>
        <div className="text">
          <p className="name">{name}</p>
          <p className="price">${price}</p>
        </div>
        <div className="actions">
          <button
            className={isLoading ? "disabled action edit" : "action edit"}
            onClick={handleNavigate}
            disabled={isLoading}
          >
            Edit Product
          </button>
          <button className="action delete" onClick={() => handleOpenPopUp(id)}>
            <RiDeleteBin6Line className="icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
