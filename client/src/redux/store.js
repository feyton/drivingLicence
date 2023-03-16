import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import { timerReducer } from "./reducers/timerReducer";

const store = configureStore({
  reducer: {
    timer: timerReducer,
    auth: authReducer,
  },
});

export default store;
