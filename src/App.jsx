import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home/Home";
import { Purchases } from "./pages/Purchases/Purchases";
import { createContext, useEffect, useState } from "react";
import { Basket } from "./pages/Home/components/Basket";
import axios from "axios";
import { Profile } from "./pages/Profile/Profile";

export const Context = createContext(null);

function App() {
  const [showBasket, setShowBasket] = useState(false);
  const [isChange, setChange] = useState(0);
  const [dataArr, setDataArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddedArr, setIsAddedArr] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3000/cards").then((res) => {
      setTimeout(() => {
        setDataArr(res.data);
        setIsLoading(false);
      }, 500);
      setPrice(
        res.data
          .filter((item) => item.isAdded)
          .reduce((sum, obj) => obj.price + sum, 0)
      );
      setIsAddedArr(res.data.filter((item) => item.isAdded));
    });
  }, [isChange]);

  const values = {
    isChange,
    setChange,
    dataArr,
    setDataArr,
    isLoading,
    setIsLoading,
    price,
    setPrice,
    isAddedArr,
    setIsAddedArr,
    sumOfPrice: price,
    showBasket,
    setShowBasket,
  };

  return (
    <Context.Provider value={values}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="*/basket" element={<Basket />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Context.Provider>
  );
}

export default App;
