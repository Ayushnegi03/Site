import { useDispatch, useSelector } from 'react-redux';
import { addToCart,removeFromCart } from '../Redux/cart/cartSlice';


const useCart = () => {
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state) => state.cart);

  const addCart = (item) => {
    dispatch(addToCart(item));
  };

  const removeCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return { items, totalAmount, addCart, removeCart  };
};

export default useCart;
