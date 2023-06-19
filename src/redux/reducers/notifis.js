import { INIT_STATE } from "../../../contant";
import { getNotifis, getType, getId,getAddNotifition } from "../actions";

export default function notifisReducers(state = INIT_STATE.notifis, action) {
  switch (action.type) {
    case getType(getNotifis.getNotifiRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getNotifis.getNotifiSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload.datanoti,
      };
    case getType(getNotifis.getNotifiFailure):
      return {
        ...state,
        isLoading: false,
      };

    case getType(getAddNotifition.getAddNotifitionRequest):
      return {
        ...state,
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
