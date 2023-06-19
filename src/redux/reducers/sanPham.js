import { INIT_STATE } from '../../../contant';
import { getType, getSanPhams, getSanPhamsPage, updateLikeSanpham, getSanPhamsSold } from '../actions';

export default function SanPhamsReducers(state = INIT_STATE.sanPham, action) {
    switch (action.type) {
        case getType(getSanPhams.getSanPhamsRequest):
            return {
                ...state,
                isLoading: true,
                nextPage: 0
            };
        case getType(getSanPhams.getSanPhamsSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload.dataPhanTrang,
                nextPage: state.nextPage + 1
            };
        case getType(getSanPhams.getSanPhamsFailure):
            return {
                ...state,
                isLoading: false,
            };
        case getType(getSanPhamsPage.getSanPhamsPageRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getSanPhamsPage.getSanPhamsPageSuccess):
            return {
                ...state,
                isLoading: false,
                data: state.data.concat(action.payload.dataPhanTrang),
                nextPage: state.nextPage + 1
            };
        case getType(getSanPhamsPage.getSanPhamsPageFailure):
            return {
                ...state,
                isLoading: false,
            };
        case getType(updateLikeSanpham.updateLikeSanphamSuccess):
            return {
                ...state,
                data: state.data.map((post) =>
                    post._id === action.payload._id ? action.payload : post
                )
            };
        default:
            return state;
    }
}
