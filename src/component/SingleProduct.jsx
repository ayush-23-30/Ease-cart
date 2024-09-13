import React from "react";
import { CartState } from "../context/Context";
import Rating from "./Rating";

const SingleProduct = ({ prod }) => {
 
  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <div className="flex flex-col  w-[300px] flex-wrap bg-white rounded-lg shadow-md p-4 m-2">
      <img
        className="h-64 w-full object-cover rounded-t-lg"
        src={prod.image}
        alt={prod.name}
      />
      <div className="flex flex-col p-4">
        <h2 className="font-bold  text-md">{prod.name}</h2>
        <p className="text-gray-500">₹ {prod.price.split(".")[0]}</p>
        {prod.fastDelivery ? (
          <p className="text-green-500">Fast Delivery</p>
        ) : (
          <p className="text-yellow-500">4 days delivery</p>
        )}
        <div className="flex">
        <Rating rating={prod.ratings}  />

        </div>
      </div>
      {cart.some((p) => p.id === prod.id) ? (
        <button
          className="mt-2 py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg"
          onClick={() =>
            dispatch({
              type: "REMOVE_FROM_CART",
              payload: prod,
            })
          }
        >
          Remove from Cart
        </button>
      ) : (
        <button
          className={`mt-2 py-2 px-4 rounded-lg ${
            !prod.inStock
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
          onClick={() =>
            dispatch({
              type: "ADD_TO_CART",
              payload: prod,
            })
          }
          disabled={!prod.inStock}
        >
          {!prod.inStock ? "Out of Stock" : "Add to Cart"}
        </button>
      )}
    </div>
  );
};

export default SingleProduct;
