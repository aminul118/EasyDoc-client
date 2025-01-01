import google from "../assets/logos/google.svg";

const GoogleLogin = () => {
  return (
    <div>
      <button className="w-full    mb-4 btn">
        <img className="w-7" src={google} alt="" /> Login with google
      </button>
    </div>
  );
};

export default GoogleLogin;
