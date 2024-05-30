import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { useContext } from "react";
import { Context } from "../App";
export const Layout = () => {
  const { setShowBasket, sumOfPrice } = useContext(Context);
  return (
    <>
      <Header setShowBasket={setShowBasket} sumOfPrice={sumOfPrice} />
      <Outlet />
    </>
  );
};
