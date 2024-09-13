import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../context/Context";
import Rating from "./Rating";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  return (
    <div className="flex items-center flex-col md:flex-row p-4 gap-4">
      <div className="flex-1">
        {cart.map((prod) => (
          <div key={prod.id} className="flex items-center border-b py-2">
            <div className="w-20">
              <img src={prod.image} alt={prod.name} className="w-full rounded" />
            </div>
            <div className="flex-1 ml-4">
              <div className="text-lg">{prod.name}</div>
              <div className="text-gray-500">₹ {prod.price}</div>
              <div className="flex items-center  mt-2">
                <Rating rating={prod.ratings} />
                <select
                  value={prod.qty}
                  onChange={(e) =>
                    dispatch({
                      type: "CHANGE_CART_QTY",
                      payload: {
                        id: prod.id,
                        qty: e.target.value,
                      },
                    })
                  }
                  className="ml-2 p-1 border rounded"
                >
                  {[...Array(prod.inStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              className="text-red-500 ml-4"
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: prod,
                })
              }
            >
              <AiFillDelete fontSize="20px" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center p-4 bg-gray-100 rounded shadow-md">
        <span className="text-xl font-semibold">Subtotal ({cart.length}) items</span>
        <span className="text-lg font-bold mt-2">Total: ₹ {total}</span>
        <button
          type="button"
          disabled={cart.length === 0}
          className={`mt-4 px-4 py-2 text-white rounded ${cart.length === 0 ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
