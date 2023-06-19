import { INIT_STATE } from "../../../contant";
import {
  getType,
  getUpdateInfor
} from "../actions";

export default function AccountsReducers(state = INIT_STATE.uploadimg, action) {
  switch (action.type) {
      case getType(getUpdateInfor.getUpdateInforRequest):
        return {
          ...state,
          data: action.payload,
          isLoading: true,
        };
      case getType(getUpdateInfor.getUpdateInforSuccess):
        return {
          ...state,
          isLoading: false,
          data: action.payload,
        };
      case getType(getUpdateInfor.getUpdateInforFailure):
        return {
          ...state,
          isLoading: false,
        };
    default:
      return state;
  }
}
