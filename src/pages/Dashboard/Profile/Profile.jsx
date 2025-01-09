import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import dummyImg from "../../../assets/icons/emptyUser.png";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoFile, setPhotoFile] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(user?.photoURL || "");
  const [uploading, setUploading] = useState(false);

  // Handle photo upload and preview
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPreviewPhoto(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async () => {
    try {
      let photoURL = previewPhoto;

      if (photoFile) {
        setUploading(true);

        // Upload image to ImgBB
        const formData = new FormData();
        formData.append("image", photoFile);

        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMG_BB_API
          }`,
          {
            method: "POST",
            body: formData,
          }
        );
        if (!response.ok) {
          throw new Error("Failed to upload image to ImgBB");
        }

        const data = await response.json();
        photoURL = data.data.url;
        updateUserProfile(displayName, photoURL);
        setUploading(false);
      }

      // Simulate profile update API
      // console.log("Updating profile with:", { displayName, photoURL });

      Swal.fire({
        title: "Good job!",
        text: "Profile updated successfully!",
        icon: "success",
      });

      setIsEditing(false);
    } catch (error) {
      setUploading(false);
      console.error("Failed to update profile:", error.message);
      Swal.fire({
        title: "Oops..",
        text: "Profile uploaad field..",
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">User Profile</h2>

      <div className="flex flex-col items-center">
        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-blue-500 mb-4">
          <img
            src={previewPhoto || dummyImg}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        {isEditing ? (
          <>
            <label className="block mb-3">
              <span className="text-gray-700">Upload Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full mt-1 border rounded-md p-2"
              />
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-2 mb-3 border rounded-md"
            />
            <button
              onClick={handleUpdateProfile}
              disabled={uploading}
              className={`w-full ${
                uploading ? "bg-gray-400" : "bg-green-500"
              } text-white py-2 rounded-md hover:bg-green-600`}
            >
              {uploading ? "Uploading..." : "Save Changes"}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="w-full bg-gray-500 text-white py-2 rounded-md mt-2 hover:bg-gray-600"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <h3 className="text-xl font-semibold mb-2">
              {user?.displayName || "No Name"}
            </h3>
            <p className="text-gray-500 mb-4">{user?.email || "No Email"}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Update Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
