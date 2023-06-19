export const dataAccount$ = (state) => state.account.data;
export const id_Account$ = (state) => state.account._id;
export const getDetailUser$ = (state) => state.account.detail;
export const checkRegister$ = (state) => state.accountRegister.data.checkVerify;
export const checkLogin$ = (state) => state.account.data.checkLogin;
export const checkUsername$ = (state) => state.account.checkUserName;
export const checkAccount$ = (state) => state.account.dataAccount;
export const avatar$ = (state) => state.account.data.check_Account.avatar;
export const checkOtp$ = (state) => state.accountRegister.data.checkOtp;

export const postsState$ = (state) => state.posts.data;

export const notifisState$ = (state) => state.notifis.data;

export const notifisStateID$ = (state) => state.addnotifi.data;

export const checkForgetPassword_phone$ = (state) => state.forgetpassword.data.checkForgetPassword_phone;
export const checkForgetPassword_otp$ = (state) => state.forgetpassword.data.checkOtp;
export const dataSanPham$ = (state) => state.sanPham;
export const dataSanPhamSold$ = (state) => state.sanPhamSold.data;
export const checkImg$ = (state) => state.uploadimg.data.linkImg;
export const checkUpdate$ = (state) => state.updateInforUser.data.checkUpdate;
export const cartOrder$ = (state) => state.cart.data;
export const addChecking$ = (state) => state.cart.addchecking;
export const buyNow$ = (state) => state.buyNow;

export const cartData$ = (state) => state.dataCart.data;
export const cartTotals$ = (state) => state.dataCart.totals;
export const isChecking$ = (state) => state.dataCart.checking;
export const countCart$ = (state) => state.dataCart.count;

export const timKiem$ = (state) => state.dataSearch.data;
export const alluser$ = (state) => state.allUser.data;
export const checkPay$ = (state) => state.payment.data.checkpayment;
export const checkAddress$ = (state) => state.address.data;

export const checkOrder$ = (state) => state.order.data;
export const dataSelectXacNhan$ =(state) => state.order.xacnhan;
export const dataSelectDaXacNhan$ =(state) => state.order.daxacnhan;
export const dataSelectDangGiao$ =(state) => state.order.danggiao;
export const dataSelectDaGiao$ =(state) => state.order.dagiao;
export const dataSelectDaHuy$ =(state) => state.order.dahuy;


