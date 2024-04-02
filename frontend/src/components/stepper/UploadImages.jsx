import {
  IoArrowBackCircleSharp,
  IoCopy,
  IoTrashOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  nextStep,
  prevStep,
  setTradeMongoId,
  setTradeStatus,
} from "../../redux/stepperSlice";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useState } from "react";
import { shortenMiddle } from "../../utils";
import { LoadingButton } from "../extras/LoadingButton";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { createTrade } from "../../redux/features/trade/tradeSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

function UploadImages() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getData = useSelector((state) => state.step);
  const selectedGiftCard = useSelector((state) => state.step.selectedGiftCard);
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addImages = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setImages((previousImages) => previousImages.concat(selectedFilesArray));
    // console.log(images);
    setSelectedImages((previousImages) => previousImages.concat(imagesArray));

    // FOR BUG IN CHROME
    event.target.value = "";
  };

  const removeImage = (image) => {
    const imageIndex = selectedImages.indexOf(image);
    setSelectedImages(selectedImages.filter((img) => img !== image));

    setImages(images.filter((img, index) => index !== imageIndex));
    URL.revokeObjectURL(image);
  };
  // File upload end

  const url = "https://api.cloudinary.com/v1_1/bamtech1/image/upload";

  // const uploadImages = async () => {
  //   if (images.length === 0) {
  //     toast.error("Please select an image to upload.");
  //     return;
  //   }

  //   setUploading(true);
  //   let imageUrls = [];

  //   for (let i = 0; i < images.length; i++) {
  //     const formData = new FormData();
  //     formData.append("file", images[i]);
  //     formData.append("upload_preset", "bamstore");
  //     formData.append("folder", "bamstore");

  //     try {
  //       const response = await fetch(url, {
  //         method: "POST",
  //         body: formData,
  //       });
  //       const data = await response.json();
  //       imageUrls.push(data.secure_url);

  //       if (i === images.length - 1) {
  //         // All images have been uploaded, proceed to update formData and next step
  //         const newFormData = {
  //           ...getData.formData,
  //           imageUrls, // Assuming imageUrls is the field where you want to store uploaded image URLs
  //         };
  //         dispatch(setFormData(newFormData));
  //         setUploading(false);
  //         toast.success("Image upload complete");
  //         dispatch(nextStep());
  //       }
  //     } catch (error) {
  //       setUploading(false);
  //       toast.error("Failed to upload image: " + error.message);
  //       break; // Stop uploading if any image fails
  //     }
  //   }
  // };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      toast.error("Please select an image to upload.");
      return;
    }

    setUploading(true);
    setIsLoading(true); // Indicate the upload process has started
    let imageUrls = [];

    try {
      // Upload images and collect URLs
      for (let i = 0; i < images.length; i++) {
        const formData = new FormData();
        formData.append("file", images[i]);
        formData.append("upload_preset", "bamstore");
        formData.append("folder", "bamstore");

        const response = await fetch(url, { method: "POST", body: formData });
        const data = await response.json();
        imageUrls.push(data.secure_url);
        setProgress(Math.round(((i + 1) / images.length) * 100));
      }

      // Prepare form data with the collected image URLs
      const finalFormData = {
        ...getData.formData,
        tradeID: getData.id,
        imageUrls,
      };

      // Dispatch the createTrade action and wait for completion
      const actionResult = await dispatch(createTrade(finalFormData));
      const result = unwrapResult(actionResult); // Use unwrapResult to handle the promise result
      console.log("Trade creation result:", result);

      dispatch(setTradeMongoId(result.id));
      dispatch(setTradeStatus(result.tradeStatus));
      console.log("idMongoId:", result._id);
      // Handle success
      toast.success("Form submission and image upload complete");
      navigate("/exchange/processing");
      dispatch(nextStep()); // Navigate to the next step
    } catch (error) {
      // Handle any errors
      toast.error("Failed to create trade or upload image: " + error.message);
    } finally {
      setUploading(false);
      setIsLoading(false);
    }
  };
  const handlePrev = () => {
    navigate(-1);
    dispatch(prevStep());
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full px-2"
      >
        <p className="text-center flex justify-center items-center gap-3 mb-4 ">
          Trade ID: {getData.id}
          <motion.span
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => copyToClipboard(getData.id)}
            className="text-primary"
          >
            <IoCopy />
          </motion.span>
        </p>
        <ul className=" flex flex-col text-neutral items-start gap-1 py-2 px-4 bg-primary w-full ">
          <li>
            {getData.formData.giftType} :{" "}
            <span className="font-bold">
              {getData.formData.spend} {getData.formData.currency}
            </span>
          </li>
          <li>
            You Receive:{" "}
            <span className="font-bold">
              {getData.formData.receive} {getData.formData.paymentOption}
            </span>
          </li>
          <li>
            Pay To:{" "}
            {getData.formData.paymentOption === "USDT" ? (
              <span className="font-bold">
                {shortenMiddle(getData.formData.usdtAddress, 10, 10)}
              </span>
            ) : (
              <span className="font-bold">Fiat Wallet</span>
            )}
          </li>
        </ul>
        <fieldset className="flex max-w-sm flex-col items-start bg-base-100 rounded-3xl w-full  p-4">
          <p className="text-center text-base">
            Please upload a clear images and accordingly{" "}
          </p>
          <div className="flex max-w-sm flex-col items-start gap-8 rounded-3xl w-full p-4">
            {selectedGiftCard && selectedGiftCard.category === "Prepaid" ? (
              <div className="flex flex-col justify-between w-full text-base-200 text-sm  ">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Card Front </span>
                  </label>
                  <input
                    name="cardFront"
                    type="file"
                    accept="image/png , image/jpeg, image/webp"
                    onChange={addImages}
                    className="file-input file-input-bordered file-input-success w-full max-w-xs"
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Card Back </span>
                  </label>
                  <input
                    name="cardBack"
                    type="file"
                    accept="image/png , image/jpeg, image/webp"
                    onChange={addImages}
                    className="file-input file-input-bordered file-input-success w-full max-w-xs"
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Receipt </span>
                  </label>
                  <input
                    name="Receipt"
                    type="file"
                    accept="image/png , image/jpeg, image/webp"
                    onChange={addImages}
                    className="file-input file-input-bordered file-input-success w-full max-w-xs"
                  />
                </div>
              </div>
            ) : (
              <div className="form-control w-full max-w-xs">
                <label className="label" htmlFor="giftcard">
                  <span className="label-text">Gift Card Image </span>
                </label>
                <input
                  name="giftcard"
                  type="file"
                  accept="image/png , image/jpeg, image/webp"
                  onChange={addImages}
                  className="file-input file-input-bordered file-input-success w-full max-w-xs"
                />
              </div>
            )}
          </div>

          {/* <div>image will preview here</div> */}
          <div
            className={
              selectedImages.length > 0
                ? "w-full max-w-sm my-4 mx-auto flex  justify-center items-center overflow-x-scroll  touch-auto border border-dark transition-all rounded-xl"
                : ""
            }
          >
            {selectedImages.length !== 0 &&
              selectedImages.map((image, index) => {
                return (
                  <div
                    key={index}
                    className="card card-compact  m-1 bg-base-100 shadow-xl overflow-x-clip transform scale-95 hover:scale-100"
                  >
                    <figure className="w-20 h-20">
                      <Zoom>
                        <img
                          className=" w-full h-auto aspect-square  object-cover"
                          src={image}
                          alt="cards"
                        />
                      </Zoom>
                    </figure>
                    <div className="card-body">
                      <div className="card-actions justify-end">
                        <IoTrashOutline
                          style={{ fontSize: "20px", color: "red" }}
                          onClick={() => removeImage(image)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="flex items-center justify-between gap-3">
            <label htmlFor="" className="text-xs">
              i verify all images are clear and eligible to read
            </label>
            <input
              name="true"
              type="checkbox"
              required
              className="checkbox checkbox-success"
            />
          </div>
        </fieldset>
        {selectedImages.length > 0 && (
          <>
            <LoadingButton
              type="submit"
              isLoading={isLoading || uploading}
              disabled={uploading || isLoading}
            >
              {uploading
                ? `Uploading... ${progress} of ${selectedImages.length}`
                : `Submit  ${selectedImages.length} Image${
                    selectedImages.length === 1 ? "" : "s"
                  }`}
            </LoadingButton>
          </>
        )}

        <button
          type="button"
          onClick={handlePrev}
          className="  text-neutral absolute top-10 left-1/2 -translate-x-1/2 md:top-24 md:left-96"
        >
          <IoArrowBackCircleSharp size={"40px"} />
        </button>
      </form>
    </>
  );
}

export default UploadImages;
