import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.webp";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../context/Context";

const MainHeader = () => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();

  const onChangeSearchBox = (e) => {
    setInputValue(e.target.value);
    productDispatch({
      type: "FILTER_BY_SEARCH",
      payload: e.target.value,
    });
  };

  return (
    <div className="h-20 bg-[#212529] w-full flex justify-around items-center text-white">
      <div>
        <Link to="/">
          <img className="w-16 h-14 rounded-full" src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="mx-2 relative">
        {useLocation().pathname.split("/")[1] !== "cart" && (
          <input
            type="text"
            onChange={onChangeSearchBox}
            value={inputValue}
            className="inputBox w-72 sm:w-[500px] h-10 rounded-lg capitalize placeholder:font-serif placeholder:text-lg placeholder:text-gray-400 outline-none text-black p-2"
            placeholder="Search a product..."
          />
        )}
        <div className="absolute top-[11px] cursor-pointer text-lg right-2 text-red-500">
          <FaSearch />
        </div>
      </div>
      <div className="flex gap-10">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg flex items-center"
          >
            <FaShoppingCart fontSize="25px" />
            <span className="ml-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs">
              {cart.length}
            </span>
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-10 p-2">
              {cart.length === 0 ? (
                <span className="block p-4 text-red-400">Cart is Empty!</span>
              ) : (
                <>
                  {cart.map((prod) => (
                    <div key={prod.id} className="flex items-center justify-between p-2 border-b">
                      <img src={prod.image} className="w-12 h-12 rounded" alt={prod.name} />
                      <div className="ml-2 flex-1">
                        <span className="block">{prod.name}</span>
                        <span className="block text-gray-600">₹ {prod.price.split(".")[0]}</span>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        className="cursor-pointer text-red-500"
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod,
                          })
                        }
                      />
                    </div>
                  ))}
                  <Link to="/cart">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg w-full mt-2">
                      Go To Cart
                    </button>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
        <div className="flex gap-2 items-center text-center text-red-100 mr-5">
          <button className="font-serif text-center h-10 w-14 rounded-lg hover:bg-blue-600 bg-blue-500">
            Login
          </button>
          <button className="font-serif hover:bg-red-600 text-center h-10 w-14 rounded-lg bg-red-500">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
