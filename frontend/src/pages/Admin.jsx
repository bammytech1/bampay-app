import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrade } from "../redux/exchange/exchangeSlice";

const Admin = () => {
  const dispatch = useDispatch();
  const addNewTrade = useSelector((state) => state.exchange);

  const [giftType, setGiftType] = useState("");
  const [rate, setRate] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [description, SetDescription] = useState("");
  const [image, setImage] = useState("");
  const [regularPrice, setRegularPrice] = useState("");
  const [color, setColor] = useState("");
  return (
    <>
      <form action="">
        <input type="text" />
      </form>
    </>
  );
};

export default Admin;
