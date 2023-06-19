import { INIT_STATE } from '../../../contant';
import {  getType,getForgetPassword,getForgetPasswordVerify,getChangePassword} from '../actions';

export default function AccountsReducers(state = INIT_STATE.forget, action) {
    switch (action.type) {
        case getType(getForgetPassword.getForgetPasswordRequest):
            return {
                ...state,
                isLoading: true
            };
        case getType(getForgetPassword.getForgetPasswordSuccess):
            return {
                ...state,
                data: action.payload,
                isLoading: true
            };
        case getType(getForgetPassword.getForgetPasswordFailure):
            return {
                ...state,
                isLoading: false
            };
            case getType(getForgetPasswordVerify.getForgetPasswordVerifyRequest):
                return {
                    ...state,
                    isLoading: true
                };
            case getType(getForgetPasswordVerify.getForgetPasswordVerifySuccess):
                return {
                    ...state,
                    data: action.payload,
                    isLoading: true
                };
            case getType(getForgetPasswordVerify.getForgetPasswordVerifyFailure):
                return {
                    ...state,
                    isLoading: false
                };



                case getType(getChangePassword.getChangePasswordRequest):
                    return {
                        ...state,
                        isLoading: true
                    };
                case getType(getChangePassword.getChangePasswordSuccess):
                    return {
                        ...state,
                        data: action.payload,
                        isLoading: true
                    };
                case getType(getChangePassword.getChangePasswordFailure):
                    return {
                        ...state,
                        isLoading: false
                    };
        default:
            return state;
    }
}
