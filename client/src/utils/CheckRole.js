import React from "react";
import { useSelector } from "react-redux";

const CheckRole = ({ children, roles = ["user"] }) => {
  const { user } = useSelector((state) => state?.auth);

  if (user?.user?.role === "super") {
    return children;
  }

  if (roles.includes(user?.user?.role)) {
    return children;
  }
  return <></>;
};

export default CheckRole;
