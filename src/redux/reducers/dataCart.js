import { INIT_STATE } from "../../../contant";
import { getType, getCountCart, updateCountCart, deleteCart } from "../actions";

export default function dataCartReducer(state = INIT_STATE.dataCart, action) {
    switch (action.type) {
        case getType(getCountCart.getCountCartRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getCountCart.getCountCartSuccess):

            let a = 0
            state.data.map((e) => {
                a = a + e.tongGiaBan
            })
            return {
                ...state,
                data: action.payload.data,
                totals: a,
                isLoading: false,
                count: action.payload.data.length
            };
        case getType(getCountCart.getCountCartFailure):
            return {
                ...state,
                isLoading: false,
            };
        case getType(updateCountCart.updateCountCartRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(updateCountCart.updateCountCartSuccess):
            return {
                ...state,
                data: state.data.map((post) =>
                    post._id === action.payload._id ? action.payload : post
                ),
                isLoading: false,
              
            };
        case getType(updateCountCart.updateCountCartFailure):
            return {
                ...state,
                isLoading: false,
            };
        case getType(deleteCart.deleteCartRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(deleteCart.deleteCartSuccess):
            let b = 0
            state.data.map((e) => {
                b = b + e.tongGiaBan
            })
            return {
                ...state,
                checking: action.payload.check,
                isLoading: false,
                totals: b,
            };
        case getType(deleteCart.deleteCartFailure):
            return {
                ...state,
                isLoading: false,
            };

        default:
            return state;
    }
}
