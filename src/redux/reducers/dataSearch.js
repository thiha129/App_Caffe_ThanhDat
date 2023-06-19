import { INIT_STATE } from '../../../contant';
import { getType, timKiem } from '../actions';

export default function SanPhamsReducers(state = INIT_STATE.timKiem, action) {
    switch (action.type) {
        case getType(timKiem.timKiemRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(timKiem.timKiemSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(timKiem.timKiemFailure):
            return {
                ...state,
                isLoading: false,
            };

        default:
            return state;
    }
}
