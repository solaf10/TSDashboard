import { Fragment, type ChangeEvent, type FormEvent } from "react";
import type { FormTypes } from "../../interfaces/interfaces";

const AuthForm = <T extends object>({
  title,
  btn,
  inputs,
  setData,
}: FormTypes<T>) => {
  let data: T;
  const dataHandeling = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name, files, type } = event.target;
    data = { ...data, [name]: type == "file" ? files?.[0] : value };
  };
  const sendData = (event: FormEvent) => {
    event.preventDefault();
    setData(data);
  };
  return (
    <form onSubmit={sendData}>
      <h2>{title}</h2>
      <div className="holder">
        {inputs.map((inputInfo, i) => (
          <Fragment key={i}>
            {inputInfo.type == "file" && (
              <label htmlFor={inputInfo.title}>{inputInfo.fileLabel}</label>
            )}
            <input
              type={inputInfo.type}
              name={inputInfo.title}
              placeholder={inputInfo.placeHolder}
              onChange={dataHandeling}
              id={inputInfo.title}
            />
          </Fragment>
        ))}
      </div>
      <input className="main-btn" type="submit" value={btn} />
    </form>
  );
};

export default AuthForm;
