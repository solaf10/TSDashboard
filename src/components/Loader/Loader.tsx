import "./Loader.css";

const Loader = ({ isbtn }: { isbtn: boolean }) => {
  return (
    <div className="loader-holder">
      <div
        className="loader"
        style={
          isbtn
            ? {
                width: "25px",
                background: "conic-gradient(#0000 10%, white) content-box",
              }
            : {}
        }
      ></div>
    </div>
  );
};

export default Loader;
