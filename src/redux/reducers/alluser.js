import { INIT_STATE } from "../../../contant";
import {  getType, getAllUser } from "../actions";

export default function AllDataReducers(state = INIT_STATE.allUser, action) {
  switch (action.type) {
    case getType(getAllUser.getAllUserRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getAllUser.getAllUserSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getAllUser.getAllUserFailure):
      return {
        ...state,
        isLoading: false,
      };


    default:
      return state;
  }
}
