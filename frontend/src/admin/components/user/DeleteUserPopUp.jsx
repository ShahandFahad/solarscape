import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DELETE_USER_BY_ID } from "../../service/apiCalls";

export default function DeleteUserPopUp({ setShowDeleteUser, clickedUserId }) {
  const notify = (errName) =>
    toast.error(`User is not Deleted! ${errName}`, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notifyUserDelete = () =>
    toast.success(`User Deleted!`, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const handleUserDeletion = () => {
    // Request to server for user passwrod Update by Id
    DELETE_USER_BY_ID(clickedUserId)
      .then((response) => {
        //Notify Success
        response.status === 200
          ? notifyUserDelete()
          : notify("User Deletion Error");
      })
      .catch((error) => {
        notify(error.name);
      });

    // after 3 seconds close pop up
    setTimeout(() => {
      setShowDeleteUser(false);
      window.location.reload();
    }, 3000);
  };
  return (
    <div className="flex justify-center h-full items-center space-x-4 bg-gray-100 backdrop-blur-sm bg-white/10">
      {/* Toast Notifier */}
      <ToastContainer />
      <div className="flex flex-col bg-white p-10 rounded-md shadow-lg">
        {/* Cancel box */}
        <h2 className="leading-loose mb-2">Are you sure?</h2>
        <div className="flex gap-2 relative focus-within:text-gray-600 text-gray-400">
          {/* Cancel Pass BTN */}
          <button
            className="flex items-center bg-blue-500 hover:bg-blue-600 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
            onClick={(e) => setShowDeleteUser(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>

            <span>Cancel</span>
          </button>
          {/* Delete Pass BTN */}
          <button
            onClick={handleUserDeletion}
            className="flex items-center bg-red-500 hover:bg-red-600 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>

            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
