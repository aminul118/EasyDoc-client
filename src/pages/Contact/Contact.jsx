import Lottie from "lottie-react";
import contactLottie from "../../assets/lottie/contact.json";
import bg from "../../assets/background/drtele.jpg";

const Contact = () => {
  return (
    <div
      className="relative h-[calc(100vh-284px)] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="flex flex-wrap md:flex-nowrap backdrop-blur-2xl rounded-lg p-6 md:p-14 max-w-4xl w-full">
        {/* Left side: Form */}
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                id="name"
                type="text"
                className="w-full border p-2 rounded outline-none focus:border-blue-600"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                id="email"
                type="email"
                className="w-full border p-2 rounded outline-none focus:border-blue-600"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                id="message"
                rows="4"
                className="w-full border p-2 rounded outline-none focus:border-blue-600 "
                placeholder="Write your message here"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right side: Animation */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4">
          <Lottie animationData={contactLottie} />
        </div>
      </div>
    </div>
  );
};

export default Contact;
