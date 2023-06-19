import { INIT_STATE } from "../../../contant";
import {  getType,getAddPay,getDeleteOderUser } from "../actions";

export default function notifisReducers(state = INIT_STATE.payment, action) {
  switch (action.type) {
    case getType(getAddPay.getAddPayRequest):
      return {
        ...state,
        isLoading: true,
        data: action.payload,
      };
    case getType(getAddPay.getAddPaySuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getAddPay.getAddPayFailure):
      return {
        ...state,
        isLoading: false,
      };


      case getType(getDeleteOderUser.getDeleteOderUserRequest):
        return {
          ...state,
          isLoading: true,
          deleteOrder: action.payload,
        };
      case getType(getDeleteOderUser.getDeleteOderUserSuccess):
        return {
          ...state,
          isLoading: false,
          deleteOrder: action.payload,
        };
      case getType(getDeleteOderUser.getDeleteOderUserFailure):
        return {
          ...state,
          isLoading: false,
        };
    default:
      return state;
  }
}
