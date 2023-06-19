import { INIT_STATE } from "../../../contant";
import {  getType, getAddNotifition,getChangeAddress} from "../actions";

export default function notifisReducers(state = INIT_STATE.address, action) {
  switch (action.type) {
    case getType(getChangeAddress.getChangeAddressRequest):
      return {
        ...state,
        // data: action.payload,
        isLoading: true,
      };
    case getType(getChangeAddress.getChangeAddressSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getChangeAddress.getChangeAddressFailure):
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
