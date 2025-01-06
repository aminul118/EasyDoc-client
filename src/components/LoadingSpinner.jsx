import Lottie from "lottie-react";
import lottie from "../assets/lottie/square-round.json";

const LoadingSpinner = () => {
  return (
    <div className="min-h-[calc(100vh-220px)] flex items-center justify-center">
      <Lottie animationData={lottie} />
    </div>
  );
};

export default LoadingSpinner;
