import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./styles.scss";
import "./index.css";
import Login from "./pages/Login";
import VerifyMail from "./pages/VerifyMail";
import Register from "./pages/Register";
import VerifyPhone from "./pages/VerifyPhone";
import Trade from "./pages/Trade";

function App() {
  const helmetContext = {};
  return (
    <HelmetProvider context={helmetContext}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="verifyMail" element={<VerifyMail />} />
            <Route path="verifyPhone" element={<VerifyPhone />} />
            <Route path="trade:/id" element={<Trade />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
