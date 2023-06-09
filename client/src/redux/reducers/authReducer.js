import { createAction, createReducer } from "@reduxjs/toolkit";

export const loginUser = createAction("auth/login");
export const logoutUser = createAction("auth/logout");

const initialState = JSON.parse(localStorage.getItem("auth")) || {
  authenticated: false,
  user: null,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginUser, (state, action) => {
      state.authenticated = true;
      state.user = action.payload;
      localStorage.setItem(
        "auth",
        JSON.stringify({
          authenticated: true,
          user: action.payload,
        })
      );
      localStorage.setItem("token", action.payload.token);
    })
    .addCase(logoutUser, (state) => {
      state.authenticated = false;
      state.user = null;
      localStorage.removeItem("auth");
      localStorage.removeItem("token");
    });
});
