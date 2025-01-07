import google from "../assets/logos/google.svg";
import useAuth from "../hooks/useAuth";

const GoogleLogin = () => {
  const { googleLogin } = useAuth();

  return (
    <div>
      <div className="divider">or</div>
      <button onClick={googleLogin} className="w-full    mb-4 btn">
        <img className="w-7" src={google} alt="" /> Login with google
      </button>
    </div>
  );
};

export default GoogleLogin;
