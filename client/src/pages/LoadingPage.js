import React from "react";

function Loading() {
  return (
    <div className="h-full flex-1 w-full flex flex-col items-center justify-center">
      <div className="w-40 h-40 flex-col rounded-full overflow-hidden bg-blue-500 relative p-1 mx-auto justify-center items-center">
        <img
          src="https://res.cloudinary.com/feyton/image/upload/v1681275645/DriveTestPro_foaqti.png"
          className="object-cover rounded-full animate-pulse mx-auto flex-1 my-auto top-1/2"
          alt="Logo"
        />
      </div>
      <h2 className="text-black font-bold mt-5 flex items-center font-sans">
        {" "}
        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8zm8-4a4 4 0 100 8 4 4 0 000-8z"
          />
        </svg>{" "}
        Loading...
      </h2>
    </div>
  );
}

export default Loading;
