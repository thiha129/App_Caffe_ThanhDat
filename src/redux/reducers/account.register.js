import { INIT_STATE } from '../../../contant';
import { getAccounts, getType, createPost, updatePost, registerAccount, verifyAccount ,registerAccountInfor} from '../actions';

export default function AccountsReducers(state = INIT_STATE.accounts, action) {
    switch (action.type) {
        case getType(registerAccount.registerAccountRequest):
            return {
                ...state,
                isLoading: true
            };
        case getType(registerAccount.registerAccountSuccess):
            return {
                ...state,
                data: action.payload,
                isLoading: true
            };
        case getType(registerAccount.registerAccountFailure):
            return {
                ...state,
                isLoading: false
            };



            case getType(registerAccountInfor.registerAccountInforRequest):
                return {
                    ...state,
                    isLoading: true
                };
            case getType(registerAccountInfor.registerAccountInforSuccess):
                return {
                    ...state,
                    data: action.payload,
                    isLoading: true
                };
            case getType(registerAccountInfor.registerAccountInforFailure):
                return {
                    ...state,
                    isLoading: false
                };





        case getType(verifyAccount.verifyAccountRequest):
            return {
                ...state,
                data: action.payload,
            };
        case getType(verifyAccount.verifyAccountSuccess):
            return {
                ...state,
                data: action.payload,
            };
        case getType(verifyAccount.verifyAccountFailure):
            return {
                ...state,
                isLoading: false
            };

        default:
            return state;
    }
}
