import type { Dispatch, ReactNode, SetStateAction } from "react";

export interface LogInInps {
  email: string;
  password: string;
}
export interface FormTypes<T> {
  title: string;
  btn: string;
  inputs: Array<{
    type: string;
    placeHolder: string;
    title: string;
    label: ReactNode;
  }>;
  setData: Dispatch<SetStateAction<T>>;
  isLoading: boolean;
}
export interface AddedProductInfo {
  name: string;
  price: string;
  image: Blob | null;
}
// get
export interface ProductsType {
  id: number;
  name: string;
  price: number;
  image_url: string;
  created_at?: string;
}
export interface PrevInfo {
  name: "";
  price: "";
  image_url: "";
}
