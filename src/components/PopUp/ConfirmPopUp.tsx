import "./ConfirmPopUp.css";
import Loader from "../Loader/Loader";

interface Props {
  action: string;
  handleCancelation: () => void;
  handleAction: () => void;
  isLoading: boolean;
}

const ConfirmPopUp = ({
  action,
  handleCancelation,
  handleAction,
  isLoading,
}: Props) => {
  return (
    <div className="overlay">
      <div className="content">
        <p>Are You Sure You Want To {action}?</p>
        <div className="btns">
          <button className="confirm" onClick={handleAction}>
            {isLoading ? (
              <div className="loader-container">
                <Loader isbtn={true} />
              </div>
            ) : (
              "Yes"
            )}
          </button>
          <button className="cancel" onClick={handleCancelation}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopUp;
