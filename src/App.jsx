import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home/Home";
import { Purchases } from "./pages/Purchases/Purchases";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { Profile } from "./pages/Profile/Profile";

export const Context = createContext(null);

function App() {
  const [showBasket, setShowBasket] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const [buyedItems, setBuyedItems] = useState([]);
  const [price, setPrice] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("https://6655455a3c1d3b602938c16d.mockapi.io/items")
      .then((res) => {
        setTimeout(() => {
          setItems(res.data);
          setIsLoading(false);
        }, 500);
      });
    axios
      .get("https://665961e4de346625136c2c22.mockapi.io/cart")
      .then((res) => setCartItems(res.data));
    axios
      .get("https://665961e4de346625136c2c22.mockapi.io/buyed")
      .then((res) => setBuyedItems(res.data));
    axios
      .get("https://6655455a3c1d3b602938c16d.mockapi.io/likes")
      .then((res) => setLikedItems(res.data));
  }, []);

  const onAddToCart = (obj) => {
    if (cartItems.find((item) => item.id === obj.id)) {
      axios.delete(
        `https://665961e4de346625136c2c22.mockapi.io/cart/${obj.id}`
      );
      setCartItems((prev) => prev.filter((item) => item.id !== obj.id));
    } else {
      axios.post("https://665961e4de346625136c2c22.mockapi.io/cart", obj);
      setCartItems((prev) => [...prev, obj]);
    }
  };

  const onLiked = (obj) => {
    if (likedItems.find((item) => item.id === obj.id)) {
      axios.delete(
        `https://6655455a3c1d3b602938c16d.mockapi.io/likes/${obj.id}`
      );
      setLikedItems((prev) => prev.filter((item) => item.id !== obj.id));
    } else {
      axios.post("https://6655455a3c1d3b602938c16d.mockapi.io/likes", obj);
      setLikedItems((prev) => [...prev, obj]);
    }
  };

  useEffect(() => {
    setPrice(cartItems.reduce((sum, obj) => obj.price + sum, 0));
  }, [cartItems]);

  const values = {
    isLoading,
    setIsLoading,
    setCartItems,
    sumOfPrice: price,
    showBasket,
    setShowBasket,
    onAddToCart,
    onLiked,
    setBuyedItems,
    items,
    likedItems,
    cartItems,
    buyedItems,
  };

  return (
    <Context.Provider value={values}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Context.Provider>
  );
}

export default App;
