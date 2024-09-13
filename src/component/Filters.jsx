import React from "react";
import { CartState } from "../context/Context";
import Rating from "./Rating";

function Filters() {
  const {
    productDispatch,
    productState: { byStock, byFastDelivery, sort, byRating },
  } = CartState();

  return (
    <div className="bg-gray-400  pt-12 flex flex-col items-center md:w-[22%] w-[30%] h-screen overflow-hidden">

      <h2 className="my-3 font-bold text-2xl">Filter Products </h2>
<div className=" ">

      <span className="flex items-center mb-2 md:mb-0">
        <input
          type="radio"
          name="group1"
          id="inline-1"
          className="mr-2"
          onChange={() =>
            productDispatch({
              type: "SORT_BY_PRICE",
              payload: "lowToHigh",
            })
          }
          checked={sort === "lowToHigh"}
        />
        <label htmlFor="inline-1" className="text-lg">
          Ascending
        </label>
      </span>
      <span className="flex items-center mb-2 md:mb-0">
        <input
          type="radio"
          name="group1"
          id="inline-2"
          className="mr-2"
          onChange={() =>
            productDispatch({
              type: "SORT_BY_PRICE",
              payload: "highToLow",
            })
          }
          checked={sort === "highToLow"}
        />
        <label htmlFor="inline-2" className="text-lg">
          Descending
        </label>
      </span>
      <span className="flex items-center mb-2 md:mb-0">
        <input
          type="checkbox"
          name="group1"
          id="inline-3"
          className="mr-2"
          onChange={() =>
            productDispatch({
              type: "FILTER_BY_STOCK",
            })
          }
          checked={byStock}
        />
        <label htmlFor="inline-3" className="text-md ">
          Include Out of Stock
        </label>
      </span>
      <span className="flex items-center mb-2 md:mb-0">
        <input
          type="checkbox"
          name="group1"
          id="inline-4"
          className="mr-2"
          onChange={() =>
            productDispatch({
              type: "FILTER_BY_DELIVERY",
            })
          }
          checked={byFastDelivery}
        />
        <label htmlFor="inline-4" className="text-md">
          Fast Delivery Only
        </label>
      </span>
      <span className="flex items-center mb-2 md:mb-0">
        <label htmlFor="rating" className="text-lg text-center mr-2">
          Rating:
        </label>
        <Rating
          rating={byRating}
          onClick={(i) =>
            productDispatch({
              type: "FILTER_BY_RATING",
              payload: i + 1,
            })
          }
          style={{ cursor: "pointer" }}
        />
      </span>
      <button
        variant="light"
        onClick={() =>
          productDispatch({
            type: "CLEAR_FILTERS",
          })
        }
        className="bg-blue-600  mt-3  hover:bg-blue-400 text-black p-2 rounded-md" 
      >
        Clear Filters
      </button>
</div>
    </div>
  );
}

export default Filters;
