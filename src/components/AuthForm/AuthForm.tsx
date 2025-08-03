import { useRef, type ChangeEvent, type FormEvent } from "react";
import type { FormTypes } from "../../interfaces/interfaces";

const AuthForm = <T extends object>({
  title,
  btn,
  inputs,
  setData,
  isLoading,
}: FormTypes<T>) => {
  // let data: T;
  const data = useRef({} as T);
  const dataHandeling = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name, files, type } = event.target;
    data.current = {
      ...data.current,
      [name]: type == "file" ? files?.[0] : value,
    };
  };
  const sendData = (event: FormEvent) => {
    event.preventDefault();
    setData(data.current);
  };
  const formContent = inputs.map((inputInfo, i) => (
    <div
      className={inputInfo.type == "file" ? "file-inp info-inp" : "info-inp"}
      key={i}
    >
      <input
        type={inputInfo.type}
        name={inputInfo.title}
        placeholder={inputInfo.placeHolder}
        onChange={dataHandeling}
        id={inputInfo.title}
      />
      {inputInfo.label}
    </div>
  ));
  return (
    <form onSubmit={sendData}>
      <h2>{title}</h2>
      <div className="holder">{formContent}</div>
      <input
        className={isLoading ? "disabled main-btn" : "main-btn"}
        type="submit"
        value={isLoading ? "Wait..." : btn}
        disabled={isLoading}
      />
    </form>
  );
};

export default AuthForm;
