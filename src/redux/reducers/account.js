import { INIT_STATE } from "../../../contant";
import {
  getAccounts,
  getAccountsUserName,
  getType,
  registerAccount,
  verifyAccount,
  getUploadImage
} from "../actions";

export default function AccountsReducers(state = INIT_STATE.accounts, action) {
  switch (action.type) {
    case getType(getAccounts.getAccountsRequest):
      return {
        ...state,
        data: action.payload,
        isLoading: true,
      };
    case getType(getAccounts.getAccountsSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        checkUserName:action.payload.checkUserName,
        dataAccount:action.payload.dataAccount,
        _id:action.payload._id
      };
    case getType(getAccounts.getAccountsFailure):
      return {
        ...state,
        isLoading: false,
      };

    case getType(getAccountsUserName.getAccountsUserNameRequest):
      return {
        ...state,
        data: action.payload,
        isLoading: true,
      };
    case getType(getAccountsUserName.getAccountsUserNameSuccess):
      return {
        ...state,
        isLoading: false,
        checkUserName:action.payload.checkUserName,
        dataAccount:action.payload.dataAccount,
        _id:action.payload._id
      };
    case getType(getAccountsUserName.getAccountsUserNameFailure):
      return {
        ...state,
        isLoading: false,
      };




    default:
      return state;
  }
}
