import "./ConfirmPopUp.css";

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
          <button
            className={isLoading ? "disabled confirm" : "confirm"}
            onClick={handleAction}
            disabled={isLoading}
          >
            {isLoading ? "Wait..." : "Yes"}
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
