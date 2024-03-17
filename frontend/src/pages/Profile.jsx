import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  RESET_AUTH,
  getUser,
  logout,
  updateUser,
} from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { LoadingButton } from "../components/extras/LoadingButton";
import { Link } from "react-router-dom";

function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const initialState = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "",
    oldPassword: "",
    newPassword: "",
    photo: user?.photo || "",
    address: user?.address || "",
    state: user?.state || "",
    country: user?.country || "",
  };

  const [userData, setUserData] = useState(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      dispatch(getUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user && user.isVerified) {
      setUserData({
        ...userData,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user?.role || "",
        // photo: user?.photo || "",
        address: user?.address || "",
        state: user?.state || "",
        country: user?.country || "",
      });
    }
  }, [dispatch, user]);

  const saveProfile = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(updateUser({ ...userData })).unwrap();
      toast.success("Profile updated successfully");

      // Conditionally log out the user if the password was changed successfully
      if (result) {
        dispatch(logout());
        dispatch(RESET_AUTH());
        navigate("/login");
        toast.info("Please log in with your new password");
      } else {
        // Refresh the profile to reflect changes without logging out
        setTimeout(() => {}, 3000);
        dispatch(getUser());
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message || "Could not update profile");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <>
      <section className=" mb-6 h-full bg-primary w-full flex justify-center items-center py-8 px-6  rounded-[50px] md:rounded-[100px]  mt-24">
        {/* <BreadCrumb title="Profile" /> */}
        <div className="container  w-full max-w-7xl  ">
          <h3 className="text-dark text-center text-lg md:text-3xl  font-bold">
            Profile
          </h3>
          <div className="place-content-center gap-1  ">
            {/* <motion.picture
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 2,
                type: "spring",
              }}
              className="!hidden md:!flex flex-col max-w-lg md:py-20 text-center lg:py-36 gap-4 justify-center items-center md:items-start"
            >
              <img className="" src={image} alt="wallet icon" />
            </motion.picture> */}
            <div className="flex  items-center justify-center">
              <div className="flex h-fit  w-full flex-col items-center justify-center rounded-3xl   py-6">
                {!user?.isVerified && (
                  <div className="flex max-w-fit my-6 ">
                    <div role="alert" className="alert  flex   alert-warning">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      <span>
                        Email address Not yet Verified!{" "}
                        <Link
                          to={"/verify-email"}
                          className="text-danger-900 underline"
                        >
                          Please verify your email
                        </Link>
                      </span>
                    </div>
                  </div>
                )}
                {user ? (
                  <div className="   ">
                    {/* <AdminOnlyLink>
              <Link className="btn btn-primary" to={"/admin/dashboard"}>
                Admin
              </Link>
            </AdminOnlyLink> */}
                  </div>
                ) : null}
                {!isLoading && user && (
                  <>
                    <form
                      onSubmit={saveProfile}
                      action=""
                      className="bg-base-100 w-full  m-auto flex-col rounded-3xl   shadow  space-y-8 p-10 text-center"
                    >
                      {/*    <!-- Component: Rounded basic input  --> */}
                      <div className="flex flex-wrap justify-between gap-2">
                        <div className="relative flex flex-col items-start gap-2  w-[47%]  ">
                          <label htmlFor="firstName">FirstName</label>
                          <input
                            type="text"
                            name="firstName"
                            required
                            value={userData?.firstName}
                            onChange={handleInputChange}
                            placeholder="First name"
                            className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                          />
                        </div>
                        <div className="relative flex flex-col items-start gap-2  w-[47%]  ">
                          <label htmlFor="lastName">LastName</label>
                          <input
                            type="text"
                            name="lastName"
                            required
                            value={userData?.lastName}
                            onChange={handleInputChange}
                            placeholder="Last Name"
                            className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                          />
                        </div>
                        <div className="relative flex flex-col items-start gap-2 w-full  md:w-[47%]  ">
                          <label htmlFor="email">Email</label>
                          <input
                            type="text"
                            name="email"
                            required
                            value={userData?.email}
                            onChange={handleInputChange}
                            placeholder="E-mail"
                            disabled
                            className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                          />
                        </div>
                        <div className="relative flex flex-col items-start gap-2 w-full  md:w-[47%]  ">
                          <label htmlFor="phone">Phone</label>
                          <input
                            type="text"
                            name="phone"
                            required
                            value={userData?.phone}
                            onChange={handleInputChange}
                            placeholder="Phone"
                            className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                          />
                        </div>
                      </div>
                      {/* <div className="w-full grid md:grid-cols-2 md:gap-10">
                        <div className="w-full ">
                          <label htmlFor="address">Address:</label>
                          <input
                            type="text"
                            name="address"
                            // required
                            value={userData?.address}
                            onChange={handleInputChange}
                            placeholder="Address"
                            className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                          />
                          <label htmlFor="state">State:</label>
                          <input
                            type="text"
                            name="state"
                            // required
                            value={userData?.state}
                            onChange={handleInputChange}
                            placeholder="Your State"
                            className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                          />
                          <label htmlFor="country">Country:</label>
                          <input
                            type="text"
                            name="country"
                            // required
                            value={userData?.country}
                            onChange={handleInputChange}
                            placeholder="country"
                            className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                          />
                        </div>
                      </div> */}

                      <LoadingButton type="submit" isLoading={isLoading}>
                        Update Profile
                      </LoadingButton>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
