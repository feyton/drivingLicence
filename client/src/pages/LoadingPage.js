import React from "react";

function Loading() {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center">
      <div className="w-40 h-40 flex-col rounded-full overflow-hidden bg-blue-300 relative p-1">
        <img
          src="https://res.cloudinary.com/feyton/image/upload/v1652309731/haf5jghwb6mzbdmtehcp.png"
          className="object-cover rounded-full animate-pulse"
          alt="Logo"
        />
      </div>
      <h2 className="text-black font-bold mt-5">Getting ready</h2>
    </div>
  );
}

export default Loading;
