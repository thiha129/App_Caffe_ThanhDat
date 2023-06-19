import { INIT_STATE } from "../../../contant";
import {  getType, getAddNotifition } from "../actions";

export default function notifisReducers(state = INIT_STATE.addnotifi, action) {
  switch (action.type) {
    case getType(getAddNotifition.getAddNotifitionRequest):
      return {
        ...state,
        data: action.payload,
        isLoading: true,
      };
    case getType(getAddNotifition.getAddNotifitionSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getAddNotifition.getAddNotifitionFailure):
      return {
        ...state,
        isLoading: false,
      };


    default:
      return state;
  }
}
