import React from "react";

function Loading() {
  return (
    <div className="h-full flex-1 w-full flex flex-col items-center justify-center">
      <div className="w-40 h-40 flex-col rounded-full overflow-hidden bg-blue-300 relative p-1 mx-auto justify-center items-center">
        <img
          src="https://res.cloudinary.com/feyton/image/upload/v1652309731/haf5jghwb6mzbdmtehcp.png"
          className="object-cover rounded-full animate-pulse mx-auto flex-1 my-auto top-1/2"
          alt="Logo"
        />
      </div>
      <h2 className="text-black font-bold mt-5">Tegereza Gato...</h2>
    </div>
  );
}

export default Loading;
