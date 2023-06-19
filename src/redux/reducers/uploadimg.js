import { INIT_STATE } from "../../../contant";
import {
  getType,
  getUploadImage
} from "../actions";

export default function AccountsReducers(state = INIT_STATE.uploadimg, action) {
  switch (action.type) {
      case getType(getUploadImage.getUploadImageRequest):
        return {
          ...state,
          data: action.payload,
          isLoading: true,
        };
      case getType(getUploadImage.getUploadImageSuccess):
        return {
          ...state,
          isLoading: false,
          data: action.payload,
        };
      case getType(getUploadImage.getUploadImageFailure):
        return {
          ...state,
          isLoading: false,
        };
    default:
      return state;
  }
}
