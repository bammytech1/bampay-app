const LoadingIndicator = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="loading loading-spinner loading-lg"
        aria-hidden="true"
      ></div>{" "}
      {/* Style as needed */}
    </div>
  );
};

export default LoadingIndicator;
