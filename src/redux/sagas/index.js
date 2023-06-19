import { takeLatest, call, put } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../../api";

function* fetchAccountsSaga(action) {
  try {
    const Accounts = yield call(api.fetchAccounts, action.payload);
    yield put(actions.getAccounts.getAccountsSuccess(Accounts.data));
  } catch (err) {
    console.error("fetchAccountsSagaError");
  }
}

//mới taoij
function* fetchAccountsUserNameSaga(action) {
  try {
    const Accounts = yield call(api.fetchAccountsUserName, action.payload);
    yield put(
      actions.getAccountsUserName.getAccountsUserNameSuccess(Accounts.data)
    );
  } catch (err) {
    console.error("fetchAccountsUserNameSagaError");
  }
}

function* fetchVerifiSaga(action) {
  try {
    const Accounts = yield call(api.fetchVerify, action.payload);
    yield put(actions.verifyAccount.verifyAccountSuccess(Accounts.data));
  } catch (err) {
    console.error("fetchVerifiSagaError");
  }
}

function* registerAccountsaga(action) {
  try {
    const post = yield call(api.fetchRegister, action.payload);
    yield put(actions.registerAccount.registerAccountSuccess(post.data));
  } catch (err) {
    console.error("registerAccountsagaError");
    // yield put(actions.createPost.createPostFailure(err));
  }
}

function* fetchPostSaga(action) {
  try {
    const posts = yield call(api.fetchPosts);
    yield put(actions.getPosts.getPostSuccess(posts.data));
  } catch (error) {
    console.log("fetchPostSaga");
  }
}

function* fetchNotisaga(action) {
  try {
    const notifi = yield call(api.fetchNotifis, action.payload);
    yield put(actions.getNotifis.getNotifiSuccess(notifi.data));
  } catch (error) {
    console.log("fetchNotisagaError");
  }
}

function* registerAccountInforsaga(action) {
  try {
    const acc = yield call(api.fetchRegisterInfor, action.payload);
    yield put(
      actions.registerAccountInfor.registerAccountInforSuccess(acc.data)
    );
  } catch (err) {
    console.error("registerAccountInforsagaError");
  }
}
function* fetchIdsaga(action) {
  try {
    const Accounts = yield call(api.fetchId, action.payload);
    yield put(actions.getId.getIdSuccess(Accounts.data));
  } catch (err) {
    console.error(err);
  }
}

function* fetchSanPhamSaga(action) {
  try {
    const data = yield call(api.fetchDataSanPham, action.payload);
    yield put(actions.getSanPhams.getSanPhamsSuccess(data.data))
    // console.log("fetchSanPhamSaga", data.data);
  } catch (error) {
    console.log("fetchSanPhamSagaError");
  }

}


function* fetchSanPhamPageSaga(action) {
  try {

    const data = yield call(api.fetchDataSanPham, action.payload);
    yield put(actions.getSanPhamsPage.getSanPhamsPageSuccess(data.data))
  } catch (error) {
    console.log('fetchSanPhamPageSagaError');
  }
}

function* fetchSanPhamSoldSaga(action) {
  try {
    const data = yield call(api.fetchDataSanPhamSold, action.payload)
    yield put(actions.getSanPhamsSold.getSanPhamsSoldSuccess(data.data))

    // console.log("fetchSanPhamSoldSaga", data.data);
  } catch (error) {
    console.log("fetchSanPhamSoldSagaError", error);

  }
}

function* fetchSanPhamSoldPageSaga(action) {
  try {

    const data = yield call(api.fetchDataSanPhamSold, action.payload);
    yield put(actions.getSanPhamsSoldPage.getSanPhamsSoldPageSuccess(data.data))
  } catch (error) {
    console.log('fetchSanPhamSoldPageSagaError');
  }
}

function* fetchSanPhamLikeSaga(action) {
  try {

    const data = yield call(api.fetchUpdateLike, action.payload);
    yield put(actions.updateLikeSanpham.updateLikeSanphamSuccess(data.data))
  } catch (error) {
    console.log('fetchSanPhamLikeSagaError');
  }
}

function* fetchForgetPasswordrsaga(action) {
  try {
    const forget = yield call(api.fetchForgetPassword, action.payload);
    yield put(actions.getForgetPassword.getForgetPasswordSuccess(forget.data));
  } catch (err) {
    console.error('fetchForgetPasswordrsagaError');
    // yield put(actions.createPost.createPostFailure(err));
  }
}
function* fetchForgetPasswordVerifiSaga(action) {
  try {
    const forget = yield call(api.fetchForgetPasswordVerify, action.payload);
    yield put(actions.getForgetPasswordVerify.getForgetPasswordVerifySuccess(forget.data));
  } catch (err) {
  }
}
function* fetchChangePasswordSaga(action) {
  try {
    const change = yield call(api.fetchChangePassword, action.payload);
    yield put(actions.getChangePassword.getChangePasswordSuccess(change.data));
  } catch (err) {
    console.error("fetchChangePasswordSagaError");
  }
}

function* fetchUploadImageSaga(action) {
  try {
    const upload = yield call(api.fetchUploadImage, action.payload);
    yield put(actions.getUploadImage.getUploadImageSuccess(upload.data));
    // console.log("[check_imageupload]", upload.data);
  } catch (err) {
    console.error("fetchUploadImageSagaError");
  }
}
function* fetchUpdateInforSaga(action) {
  try {
    const update = yield call(api.fetchUpdateInfor, action.payload);
    yield put(actions.getUpdateInfor.getUpdateInforSuccess(update.data));
  } catch (err) {
    console.error("fetchUpdateInforSagaError");
  }
}
function* fetchAddCartSaga(action) {
  try {
    const add = yield call(api.fetchAddCart, action.payload);
    yield put(actions.getAddCart.getAddCartSuccess(add.data));
  } catch (err) {
    console.error("fetchAddCartSagaError");
  }
}
function* fetchDataCartSaga(action) {
  try {
    const data1 = yield call(api.fetchDataCart, action.payload);
    yield put(actions.getCountCart.getCountCartSuccess(data1.data));
    yield put(actions.getBuyNow.getBuyNowSuccess(data1.data))
  } catch (err) {
    console.error("fetchDataCartSagaError", err);
  }
}
function* fetchUpdateCartSaga(action) {
  try {
    const data = yield call(api.fetchUpdateCart, action.payload);
    yield put(actions.updateCountCart.updateCountCartSuccess(data.data));
  } catch (err) {
    console.error("fetchUpdateCartSagaError");
  }
}
function* fetchDelCartSaga(action) {
  try {
    const data = yield call(api.fetchDelCart, action.payload);
    yield put(actions.deleteCart.deleteCartSuccess(data.data));
  } catch (err) {
    console.error("fetchDelCartSagaError", err);
  }
}

function* fetchTimKiemSaga(action) {
  try {
    const data = yield call(api.fetchTimKiem, action.payload);
    yield put(actions.timKiem.timKiemSuccess(data.data));

  } catch (error) {
    console.error("fetchTimKiemSagaError");

  }
}
function* fetchAddNotiSaga(action) {
  try {
    const add = yield call(api.fetchAddNoti, action.payload);
    yield put(actions.getAddNotifition.getAddNotifitionSuccess(add.data));
  } catch (err) {
    console.error("fetchAddNotiSagaError");
  }
}
// get all datauser
function* fetchAllUserSaga() {

  try {
    const all = yield call(api.fetchAllUser);
    yield put(actions.getAllUser.getAllUserSuccess(all.data));
    // console.log('[ad]',all.data);
  } catch (err) {
    console.error("fetchAllUserSaga");
  }
}
// thêm sản phẩm vào thanh toán 
function* fetchAddPaymentSaga(action) {

  try {
    const add = yield call(api.fetchAddPayment, action.payload);
    yield put(actions.getAddPay.getAddPaySuccess(add.data));
    // console.log('[ad]',all.data);
  } catch (err) {
    console.error("fetchAddPaymentSaga");
  }
}
function* fetchOrderStatusSaga(action) {
  try {
    const order = yield call(api.fetchOrderStatus, action.payload);
    yield put(actions.getOrderStatus.getOrderStatusSuccess(order.data));
    // console.log('[order]',order.data);
  } catch (error) {
    console.error('fetchOrderStatusSaga');
  }
}
function* fetchChangeAddressSaga(action) {
  try {
    const address = yield call(api.fetchChangeAddress, action.payload);
    yield put(actions.getChangeAddress.getChangeAddressSuccess(address.data));
    // console.log('[address]',address.data);
  } catch (error) {
    console.error('fetchChangeAddressSaga');
  }
}
function* fetchDeleteOrderUserSaga(action) {
  try {
    const deleteO = yield call(api.fetchDeleteOrderStatus, action.payload);
    yield put(actions.getDeleteOderUser.getDeleteOderUserSuccess(deleteO.deleteOrder));
    // console.log('[address]',address.data);
  } catch (error) {
    console.error('fetchDeleteOrderUserSaga');
  }
}



function* mySaga() {
  yield takeLatest(actions.getAccounts.getAccountsRequest, fetchAccountsSaga);
  yield takeLatest(actions.getAccountsUserName.getAccountsUserNameRequest, fetchAccountsUserNameSaga);
  yield takeLatest(actions.registerAccountInfor.registerAccountInforRequest, registerAccountInforsaga);
  yield takeLatest(actions.registerAccount.registerAccountRequest, registerAccountsaga);
  yield takeLatest(actions.verifyAccount.verifyAccountRequest, fetchVerifiSaga);
  yield takeLatest(actions.getForgetPassword.getForgetPasswordRequest, fetchForgetPasswordrsaga);
  yield takeLatest(actions.getForgetPasswordVerify.getForgetPasswordVerifyRequest, fetchForgetPasswordVerifiSaga);
  yield takeLatest(actions.getChangePassword.getChangePasswordRequest, fetchChangePasswordSaga);
  yield takeLatest(actions.getNotifis.getNotifiRequest, fetchNotisaga);
  yield takeLatest(actions.getPosts.getPostsRequest, fetchPostSaga);
  yield takeLatest(actions.getSanPhams.getSanPhamsRequest, fetchSanPhamSaga);
  yield takeLatest(actions.getSanPhamsSold.getSanPhamsSoldRequest, fetchSanPhamSoldSaga);
  yield takeLatest(actions.getSanPhamsPage.getSanPhamsPageRequest, fetchSanPhamPageSaga);
  yield takeLatest(actions.getSanPhamsSoldPage.getSanPhamsSoldPageRequest, fetchSanPhamSoldPageSaga);
  yield takeLatest(actions.updateLikeSanpham.updateLikeSanphamRequest, fetchSanPhamLikeSaga);
  yield takeLatest(actions.getUploadImage.getUploadImageRequest, fetchUploadImageSaga);
  yield takeLatest(actions.getUpdateInfor.getUpdateInforRequest, fetchUpdateInforSaga);
  yield takeLatest(actions.getAddCart.getAddCartRequest, fetchAddCartSaga);
  yield takeLatest(actions.getCountCart.getCountCartRequest, fetchDataCartSaga);
  yield takeLatest(actions.updateCountCart.updateCountCartRequest, fetchUpdateCartSaga);
  yield takeLatest(actions.deleteCart.deleteCartRequest, fetchDelCartSaga);
  yield takeLatest(actions.timKiem.timKiemRequest, fetchTimKiemSaga);
  yield takeLatest(actions.getAddNotifition.getAddNotifitionRequest, fetchAddNotiSaga);
  yield takeLatest(actions.getAllUser.getAllUserRequest, fetchAllUserSaga);
  yield takeLatest(actions.getAddPay.getAddPayRequest, fetchAddPaymentSaga);
  yield takeLatest(actions.getOrderStatus.getOrderStatusRequest, fetchOrderStatusSaga);
  yield takeLatest(actions.getChangeAddress.getChangeAddressRequest, fetchChangeAddressSaga);
  yield takeLatest(actions.getDeleteOderUser.getDeleteOderUserRequest, fetchDeleteOrderUserSaga);

}

export default mySaga;
