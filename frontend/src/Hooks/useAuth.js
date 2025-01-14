import { SIGN_IN_SUCCESS,LOGOUT } from '../Redux/auth/authSlice'; // Import action creators
import { useDispatch, useSelector } from 'react-redux';


const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const loginUser = async (credentials) => {
    await dispatch(SIGN_IN_SUCCESS(credentials));
  };

  const logoutUser = () => {
    dispatch(LOGOUT());
  };

  return { user, loading, error, loginUser, logoutUser };
};

export default useAuth;