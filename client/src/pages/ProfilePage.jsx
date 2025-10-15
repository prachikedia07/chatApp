import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import new_logo1 from "../assets/new_logo1.svg"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);
  const [selectedImg, setSelectedImg] = useState(null);
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImg) {
      await updateProfile({ fullName: name, bio });
      navigate("/");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({ profilePic: base64Image, fullName: name, bio });
      navigate("/");
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div
        className="w-5/6 max-w-2xl backdrop-glass border-2 border-[var(--border)] rounded-2xl
                   flex justify-between items-center max-sm:flex-col-reverse text-[var(--text-primary)]"
      >
        {/* Left */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 p-10 flex-1"
        >
          <h3 className="text-lg font-semibold">Profile details</h3>
          <label
            htmlFor="avatar"
            className="flex items-center gap-3 cursor-pointer text-[var(--text-secondary)]"
          >
            <input
              onChange={(e) => setSelectedImg(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />
            <img
              src={
                selectedImg
                  ? URL.createObjectURL(selectedImg)
                  : assets.avatar_icon
              }
              alt=""
              className={`w-12 h-12 ${
                selectedImg && "rounded-full"
              } object-cover`}
            />
            Upload Profile Image
          </label>

          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            required
            placeholder="Your Name"
            className="p-2 border border-[var(--border)] rounded-md bg-[var(--bg-secondary)]
                       focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
          />

          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            required
            placeholder="Write profile bio"
            rows={4}
            className="p-2 border border-[var(--border)] rounded-md bg-[var(--bg-secondary)]
                       focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
          ></textarea>

          <button
            type="submit"
            className="py-2 px-5 rounded-full glow-on-hover text-white text-lg"
            style={{ background: "var(--button-bg)" }}
          >
            Save
          </button>
        </form>

        {/* Right */}
        <img
          className={`max-w-60 aspect-square rounded-full mx-10 max-sm:mt-10 object-cover`}
          src={authUser?.profilePic || new_logo1}
          alt=""
        />
      </div>
    </div>
  );
};

export default ProfilePage;
