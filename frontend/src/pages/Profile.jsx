import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice";
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("http://localhost:8000/api/v1/users/signOut");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.data.user.username}
          id="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="email"
          defaultValue={currentUser.data.user.email}
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="address"
          id="address"
          className="border p-3 rounded-lg"
          defaultValue={currentUser.data.user.address}
        />
        <div className="flex items-center justify-center p-3">
          {currentUser.data.user.role === 'admin' ? 
          (<Link
            to={"/dashboard"}
            className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
          >
            Go to DashBoard
          </Link>):(<Link to={"/"} className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95">My Orders</Link>)}
        </div>
      </form>
      <div className="flex items-center justify-center p-3">
        <span
          onClick={handleSignOut}
          className="text-white uppercase cursor-pointer bg-red-700 p-3 rounded-lg "
        >
          Sign out
        </span>
      </div>
    </div>
  );
};

export default Profile;
