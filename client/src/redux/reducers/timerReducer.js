import { createReducer, createAction } from "@reduxjs/toolkit";

export const startTimer = createAction('timer/start')
export const stopTimer = createAction('timer/stop')

const initialState = { running: false };

export const timerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(startTimer, (state, action) => {
      state.running = true;
    })
    .addCase(stopTimer, (state, action) => {
      state.running = false;
    });
});
