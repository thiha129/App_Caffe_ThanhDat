import { INIT_STATE } from "../../../contant";
import {  getType,getOrderStatus,getOrder } from "../actions";

export default function notifisReducers(state = INIT_STATE.order, action) {
  switch (action.type) {
    case getType(getOrderStatus.getOrderStatusRequest):
      return {
        ...state,
        data: action.payload,
        isLoading: true,
      };
    case getType(getOrderStatus.getOrderStatusSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload.check,
        xacnhan:action.payload.check.filter((obj) =>
        (obj.type == '1')),
        daxacnhan:action.payload.check.filter((obj) =>
        (obj.type == '2')),
        danggiao:action.payload.check.filter((obj) =>
        (obj.type == '3')),
        dagiao:action.payload.check.filter((obj) =>
        (obj.type == '4')),
        dahuy:action.payload.check.filter((obj) =>
        (obj.type == '0')),
      };
    case getType(getOrderStatus.getOrderStatusFailure):
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
