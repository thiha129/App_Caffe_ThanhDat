import { INIT_STATE } from "../../../contant";
import { getAddCart, getType } from "../actions";

export default function postsReducers(state = INIT_STATE.cart, action) {
  switch (action.type) {
    case getType(getAddCart.getAddCartRequest):
      return {
        ...state,
        isLoading: true,
        data: action.payload,
      };
    case getType(getAddCart.getAddCartSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        addchecking:action.payload.trangThai
      };
    case getType(getAddCart.getAddCartFailure):
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}
