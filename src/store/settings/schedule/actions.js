import * as actionTypes from "./actionTypes";

export const getSchedule = () => ({
  type: actionTypes.GET_SCHEDULE,
});

export const getScheduleSuccess = (schedule) => ({
  type: actionTypes.GET_SCHEDULE_SUCCESS,
  payload: { schedule },
});

export const editSchedule = (values, id, setState) => ({
  type: actionTypes.EDIT_SCHEDULE,
  values,
  id,
  setState,
});

export const editScheduleSuccess = (msg) => ({
  type: actionTypes.EDIT_SCHEDULE_SUCCESS,
  payload: msg,
});

export const clearAlert = () => ({
  type: actionTypes.CLEAR_ALERT,
});

export const apiError = (msg) => ({
  type: actionTypes.API_ERROR,
  payload: msg,
});
