import { useNavigate } from "react-router";
import "./Product.css";
import { RiDeleteBin6Line } from "react-icons/ri";

interface Props {
  id: number;
  name: string;
  price: number;
  image: string;
  handleOpenPopUp: (id: number) => void;
}

const Product = ({ id, name, price, image, handleOpenPopUp }: Props) => {
  const navigate = useNavigate();
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
            className="action edit"
            onClick={() => navigate(`/dashboard/items/edit/${id}`)}
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
