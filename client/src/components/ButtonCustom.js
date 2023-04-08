import { Button } from "flowbite-react";
import React from "react";

function ButtonCustom({ loading = false, children, ...props }) {
  return (
    <Button {...props}>
      {loading && (
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
        </svg>
      )}
      {children}
    </Button>
  );
}

export default ButtonCustom;
