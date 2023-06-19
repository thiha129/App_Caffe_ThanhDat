import { createActions } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction().type;
};

export const getAccounts = createActions({
  getAccountsRequest: (payload) => payload,
  getAccountsSuccess: (payload) => payload,
  getAccountsFailure: (err) => err,
});
//mới taoij
export const getAccountsUserName = createActions({
  getAccountsUserNameRequest: (payload) => payload,
  getAccountsUserNameSuccess: (payload) => payload,
  getAccountsUserNameFailure: (err) => err,
});
//
export const registerAccount = createActions({
  registerAccountRequest: (payload) => payload,
  registerAccountSuccess: (payload) => payload,
  registerAccountFailure: (err) => err,
});
export const registerAccountInfor = createActions({
  registerAccountInforRequest: (payload) => payload,
  registerAccountInforSuccess: (payload) => payload,
  registerAccountInforFailure: (err) => err,

});
export const verifyAccount = createActions({
  verifyAccountRequest: (payload) => payload,
  verifyAccountSuccess: (payload) => payload,
  verifyAccountFailure: (err) => err,
});

//get data post
export const getPosts = createActions({
  getPostsRequest: undefined,
  getPostSuccess: (payload) => payload,
  getPostFailure: (err) => err,
});
//get notifi
export const getNotifis = createActions({
  getNotifiRequest: (payload) => payload,
  getNotifiSuccess: (payload) => payload,
  getNotifiFailure: (err) => err,
});

export const getForgetPassword = createActions({
  getForgetPasswordRequest: (payload) => payload,
  getForgetPasswordSuccess: (payload) => payload,
  getForgetPasswordFailure: (err) => err
})
export const getForgetPasswordVerify = createActions({
  getForgetPasswordVerifyRequest: (payload) => payload,
  getForgetPasswordVerifySuccess: (payload) => payload,
  getForgetPasswordVerifyFailure: (err) => err
})
export const getChangePassword = createActions({
  getChangePasswordRequest: (payload) => payload,
  getChangePasswordSuccess: (payload) => payload,
  getChangePasswordFailure: (err) => err
})

/** Lấy dữ liêu sản phẩm và phân trang */
export const getSanPhams = createActions({
  getSanPhamsRequest: (payload) => payload,
  getSanPhamsSuccess: (payload) => payload,
  getSanPhamsFailure: (err) => err,
});

export const getSanPhamsPage = createActions({
  getSanPhamsPageRequest: (payload) => payload,
  getSanPhamsPageSuccess: (payload) => payload,
  getSanPhamsPageFailure: (err) => err,
});
export const getSanPhamsSold = createActions({
  getSanPhamsSoldRequest: (payload) => payload,
  getSanPhamsSoldSuccess: (payload) => payload,
  getSanPhamsSoldFailure: (err) => err,
});
export const getSanPhamsSoldPage = createActions({
  getSanPhamsSoldPageRequest: (payload) => payload,
  getSanPhamsSoldPageSuccess: (payload) => payload,
  getSanPhamsSoldPageFailure: (err) => err,
});

/** Thay đổi yêu thích */
export const updateLikeSanpham = createActions({
  updateLikeSanphamRequest: (payload) => payload,
  updateLikeSanphamSuccess: (payload) => payload,
  updateLikeSanphamFailure: (err) => err
})
export const getUploadImage = createActions({
  getUploadImageRequest: (payload) => payload,
  getUploadImageSuccess: (payload) => payload,
  getUploadImageFailure: (err) => err
})
export const getUpdateInfor = createActions({
  getUpdateInforRequest: (payload) => payload,
  getUpdateInforSuccess: (payload) => payload,
  getUpdateInforFailure: (err) => err
})

//thêm vào giỏ hàng
export const getAddCart = createActions({
  getAddCartRequest: (payload) => payload,
  getAddCartSuccess: (payload) => payload,
  getAddCartFailure: (err) => err
})

//Lấy số lượng hàng
export const getCountCart = createActions({
  getCountCartRequest: (payload) => payload,
  getCountCartSuccess: (payload) => payload,
  getCountCartFailure: (err) => err
})
//Cập nhật sản phẩm khi sau sửa đổi
export const updateCountCart = createActions({
  updateCountCartRequest: (payload) => payload,
  updateCountCartSuccess: (payload) => payload,
  updateCountCartFailure: (err) => err
})
//Cập nhật sản phẩm khi sau sửa đổi
export const deleteCart = createActions({
  deleteCartRequest: (payload) => payload,
  deleteCartSuccess: (payload) => payload,
  deleteCartFailure: (err) => err
})
//Cập nhật sản phẩm khi sau sửa đổi
export const timKiem = createActions({
  timKiemRequest: (payload) => payload,
  timKiemSuccess: (payload) => payload,
  timKiemFailure: (err) => err

})
// thêm noti
export const getAddNotifition = createActions({
  getAddNotifitionRequest: (payload) => payload,
  getAddNotifitionSuccess: (payload) => payload,
  getAddNotifitionFailure: (err) => err
})
// thêm noti
export const getBuyNow = createActions({
  getBuyNowRequest: (payload) => undefined,
  getBuyNowSuccess: (payload) => payload,
  getBuyNowFailure: (err) => err
})
// lấy all dataUser
export const getAllUser = createActions({
  getAllUserRequest: (payload) => payload,
  getAllUserSuccess: (payload) => payload,
  getAllUserFailure: (err) => err
})
export const getAddPay = createActions({
  getAddPayRequest: (payload) => payload,
  getAddPaySuccess: (payload) => payload,
  getAddPayFailure: (err) => err
})
export const getOrderStatus = createActions({
  getOrderStatusRequest: (payload) => payload,
  getOrderStatusSuccess: (payload) => payload,
  getOrderStatusFailure: (err) => err
})
export const getOrder= createActions({
  getOrderRequest:(payload) => payload,
  getOrderSuccess:(payload) =>payload,
  getOrderFailure:(err) => err
})
export const getChangeAddress = createActions({
  getChangeAddressRequest:(payload) =>payload,
  getChangeAddressSuccess:(payload) =>payload,
  getChangeAddressFailure:(err) => err
})
export const getDeleteOderUser = createActions({
  getDeleteOderUserRequest:(payload) => payload,
  getDeleteOderUserSuccess:(payload) => payload,
  getDeleteOderUserFailure:(err) =>err
})