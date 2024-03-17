import { motion } from "framer-motion";
import image from "../assets/loginimage.svg";
import { Link, useNavigate } from "react-router-dom";
import MinFooter from "../components/MinFooter";
import { useEffect, useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { validateEmail } from "../utils";
import { RESET_AUTH, register } from "../redux/features/auth/authSlice";
import { LoadingButton } from "../components/extras/LoadingButton";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
};
const Register = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { firstName, lastName, email, password } = formData;

  const { isLoggedIn, isSuccess } = useSelector((state) => state.auth);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    // console.log(firstName, lastName, email, password);
    if (!email || !password) {
      return toast.error("All field are required");
    }
    if (password.length < 6) {
      return toast.error("Please must be up to 6 characters");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }
    if (phone.match("^[0-9]{10}$")) {
      return toast.error("Please enter a valid phone number");
    }

    const userData = {
      firstName,
      lastName,
      email,
      phone,
      password,
    };
    setIsLoading(true);
    await dispatch(register(userData));
    setIsLoading(false);
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/verify-Mail");
    }

    dispatch(RESET_AUTH());
  }, [isSuccess, isLoading, navigate]);
  return (
    <>
      <section className=" mb-6 h-full bg-primary w-full flex justify-center items-center py-8 px-6  rounded-[50px] md:rounded-[100px]  mt-24">
        <div className="container  w-full max-w-7xl  ">
          <div className="place-content-center gap-1  grid md:grid-cols-2 mt-4">
            <motion.picture
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 2,
                type: "spring",
              }}
              className="!hidden md:!flex flex-col max-w-lg md:py-20 text-center lg:py-36 gap-4 justify-center items-center md:items-start"
            >
              <img className="" src={image} alt="wallet icon" />
            </motion.picture>
            <div className="flex  items-center justify-center">
              <div className="flex h-fit  w-full flex-col items-center justify-center rounded-3xl   py-6">
                <form
                  onSubmit={registerUser}
                  className="bg-base-100 w-full max-w-sm m-auto flex-col rounded-3xl   shadow  space-y-8 p-10 text-center"
                >
                  <p className="text-base-300 text-center text-2xl max-w-xs">
                    create an account
                  </p>
                  <div className="relative  w-full group">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="FirstName"
                      required
                      value={firstName}
                      className="peer relative bg-base-100 h-14 w-full rounded-3xl  border-2 border-base-300 px-4 text-sm text-dark placeholder-transparent outline-none transition-all autofill:bg-base-100 invalid:border-gray invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-error focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor="firstName"
                      className="absolute left-2 -top-6 z-[1] cursor-text px-2 text-base text-base-300  transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg- before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-6 peer-required:after:text-error peer-required:after:content-['\00a0*'] peer-invalid:text-base-300 peer-focus:-top-6 peer-focus:cursor-default peer-focus:text-base peer-focus:text-emerald-500 peer-invalid:peer-focus:text-error peer-disabled:cursor-not-allowed peer-disabled:text-base-300 peer-disabled:before:bg-transparent"
                    >
                      FirstName
                    </label>
                  </div>

                  <div className="relative  w-full group">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="LastName"
                      required
                      value={lastName}
                      className="peer relative bg-base-100 h-14 w-full rounded-3xl  border-2 border-base-300 px-4 text-sm text-dark placeholder-transparent outline-none transition-all autofill:bg-base-100 invalid:border-gray invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-error focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor="lastName"
                      className="absolute left-2 -top-6 z-[1] cursor-text px-2 text-base text-base-300  transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg- before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-6 peer-required:after:text-error peer-required:after:content-['\00a0*'] peer-invalid:text-base-300 peer-focus:-top-6 peer-focus:cursor-default peer-focus:text-base peer-focus:text-emerald-500 peer-invalid:peer-focus:text-error peer-disabled:cursor-not-allowed peer-disabled:text-base-300 peer-disabled:before:bg-transparent"
                    >
                      LastName
                    </label>
                  </div>
                  <div className="group relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={handleInputChange}
                      className="peer relative bg-base-100 h-14 w-full rounded-3xl  border-2 border-base-300 px-4 text-sm text-dark placeholder-transparent outline-none transition-all autofill:bg-base-100 invalid:border-gray invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-error focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-2 -top-6 z-[1] cursor-text px-2 text-base text-base-300  transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg- before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-6 peer-required:after:text-error peer-required:after:content-['\00a0*'] peer-invalid:text-base-300 peer-focus:-top-6 peer-focus:cursor-default peer-focus:text-base peer-focus:text-emerald-500 peer-invalid:peer-focus:text-error peer-disabled:cursor-not-allowed peer-disabled:text-base-300 peer-disabled:before:bg-transparent"
                    >
                      Email
                    </label>
                  </div>
                  <div className="group relative">
                    <PhoneInput
                      name="phone"
                      defaultCountry="ng"
                      value={phone}
                      // onChange={handleInputChange}
                      onChange={(phone) => setPhone(phone)}
                      className="phone-container "
                    />
                    <label
                      htmlFor="phone"
                      className="absolute left-2 -top-6 z-[1] cursor-text px-2 text-base text-base-300  transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg- before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-6 peer-required:after:text-error peer-required:after:content-['\00a0*'] peer-invalid:text-base-300 peer-focus:-top-6 peer-focus:cursor-default peer-focus:text-base peer-focus:text-emerald-500 peer-invalid:peer-focus:text-error peer-disabled:cursor-not-allowed peer-disabled:text-base-300 peer-disabled:before:bg-transparent"
                    >
                      Phone
                    </label>
                  </div>
                  <div className="relative ">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      placeholder="Password"
                      value={password}
                      onChange={handleInputChange}
                      className="peer relative bg-base-100 h-14 w-full rounded-3xl  border-2 border-base-300 px-4 text-sm text-dark placeholder-transparent outline-none transition-all autofill:bg-base-100 invalid:border-gray invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-error focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    />

                    {showPassword ? (
                      <svg
                        onClick={() => setShowPassword(!showPassword)}
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute top-1/2 -translate-y-1/2 right-4 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-labelledby="title-4 description-4"
                        role="graphics-symbol"
                      >
                        <title id="title-4">Check mark icon</title>
                        <desc id="description-4">Icon description here</desc>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    ) : (
                      <svg
                        onClick={() => setShowPassword(!showPassword)}
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute top-1/2 -translate-y-1/2 right-4 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-labelledby="title-4d description-4d"
                        role="graphics-symbol"
                      >
                        <title id="title-4d">Check mark icon</title>
                        <desc id="description-4d">Icon description here</desc>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    )}
                    <label
                      htmlFor="password"
                      className="absolute left-2 -top-6 z-[1] cursor-text px-2 text-base text-base-300  transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg- before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-6 peer-required:after:text-error peer-required:after:content-['\00a0*'] peer-invalid:text-base-300 peer-focus:-top-6 peer-focus:cursor-default peer-focus:text-base peer-focus:text-emerald-500 peer-invalid:peer-focus:text-error peer-disabled:cursor-not-allowed peer-disabled:text-base-300 peer-disabled:before:bg-transparent"
                    >
                      Password
                    </label>
                  </div>
                  <LoadingButton type="submit" isLoading={isLoading}>
                    Register
                  </LoadingButton>

                  <p className="inline-flex !w-auto justify-center font-medium text-primary">
                    Have an account already?
                    <span className="ml-2">
                      <Link to={"/login"} className="text-success">
                        Login
                      </Link>
                    </span>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <MinFooter />
    </>
  );
};

export default Register;
