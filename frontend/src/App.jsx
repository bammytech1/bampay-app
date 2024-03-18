import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./styles.scss";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import VerifyMail from "./pages/VerifyMail";
import Register from "./pages/Register";
import VerifyPhone from "./pages/VerifyPhone";
import Trade from "./pages/Trade";
import axios from "axios";
import { useEffect } from "react";

import {
  getLoginStatus,
  getUser,
  logout,
  selectIsLoggedIn,
  selectUser,
} from "./redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Exchange from "./pages/Exchange";
import Wallet from "./pages/Wallet";
import TradeHome from "./pages/TradeHome";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  // Setup Axios defaults
  axios.defaults.withCredentials = true;

  // Axios interceptor to handle 401 Unauthorized globally
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // Assuming logout action clears the authentication state
          dispatch(logout());
          // Redirect to login page
          navigate("/login", { replace: true });
        }
        return Promise.reject(error);
      }
    );

    // Cleanup the interceptor when the component is unmounted
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [dispatch, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    dispatch(getLoginStatus());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn, user]);

  const helmetContext = {};
  return (
    <HelmetProvider context={helmetContext}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="verify-Mail" element={<VerifyMail />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="exchange" element={<Exchange />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="trade-Home" element={<TradeHome />} />
          <Route path="verify-Phone" element={<VerifyPhone />} />
          <Route path="trade:/id" element={<Trade />} />
        </Route>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
