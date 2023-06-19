import { INIT_STATE } from '../../../contant';
import { getType, getSanPhamsSold, getSanPhamsSoldPage } from '../actions';

export default function SanPhamsReducers(state = INIT_STATE.sanPham, action) {
    switch (action.type) {
        case getType(getSanPhamsSold.getSanPhamsSoldRequest):
            return {
                ...state,
                isLoading: true,
                nextPage: 0
            };
        case getType(getSanPhamsSold.getSanPhamsSoldSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                nextPage: state.nextPage + 1
            };
        case getType(getSanPhamsSold.getSanPhamsSoldFailure):
            return {
                ...state,
                isLoading: false,
            };
        case getType(getSanPhamsSoldPage.getSanPhamsSoldPageRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getSanPhamsSoldPage.getSanPhamsSoldPageSuccess):
            return {
                ...state,
                isLoading: false,
                data: state.data.concat(action.payload),
                nextPage: state.nextPage + 1
            };
        case getType(getSanPhamsSoldPage.getSanPhamsSoldPageFailure):
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}
