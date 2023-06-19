import { INIT_STATE } from '../../../contant';
import { getType, getBuyNow } from '../actions';

export default function BuyNowReducers(state = INIT_STATE.buyNow, action) {
    switch (action.type) {
        case getType(getBuyNow.getBuyNowRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getBuyNow.getBuyNowSuccess):
            return {
                ...state,
                isLoading: false,
                data: state.data.map((post) =>
                    "1" == action.payload._id ? console.log("[getBuyNow]", action.payload.checkBuyNow) : console.log("[getBuyNow]", action.payload.checkBuyNow)
                )
            };
        case getType(getBuyNow.getBuyNowFailure):
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}
