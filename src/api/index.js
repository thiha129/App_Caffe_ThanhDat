import axios from "axios";
// const URL = "https://thanh-dat-coffee.herokuapp.com";
const URL = "http://192.168.1.8:3030";
// 103.75.185.148

export const fetchAccounts = (payload) => axios.post(`${URL}/account/login?phonenumber=${payload.phonenumber}&password=${payload.password}`);
export const fetchAccountsUserName = (payload) => axios.post(`${URL}/account/?phonenumber=${payload.phonenumber}`);
export const fetchRegister = (payload) => axios.post(`${URL}/account/register?phonenumber=${payload.phonenumber}&channel=${payload.channel}&otp=${payload.otp}&username=${payload.username}&birthday=${payload.birthday}&password=${payload.password}`);
export const fetchRegisterInfor = (payload) => axios.post(`${URL}/account/registerinfor?phonenumber=${payload.phonenumber}&otp=${payload.otp}&username=${payload.username}&birthday=${payload.birthday}&password=${payload.password}&address=${payload.address}&specificaddress=${payload.specificaddress}&tinhTp=${payload.tinhTp}&xaPhuong=${payload.xaPhuong}&quanHuyen=${payload.quanHuyen}`);
export const fetchVerify = (payload) => axios.post(`${URL}/account/verify?phonenumber=${payload.phonenumber}&code=${payload.code}`);
export const fetchPosts = () => axios.get(`${URL}/posts`);
export const fetchNotifis = (payload) => axios.get(`${URL}/notifi?id_Account=${payload}`);
export const fetchId = (payload) => axios.get(`${URL}/notifi/getId?phonenumber=${payload.phonenumber}`);
export const fetchForgetPassword = (payload) => axios.post(`${URL}/account/forgetpassword?phonenumber=${payload.phonenumber}&channel=${payload.channel}`);
export const fetchForgetPasswordVerify = (payload) => axios.post(`${URL}/account/verifyforgetpassword?phonenumber=${payload.phonenumber}&code=${payload.code}`);
export const fetchChangePassword = (payload) => axios.post(`${URL}/account/changepassword?phonenumber=${payload.phonenumber}&password=${payload.password}`);
export const fetchDataSanPham = (payload) => {
    console.log("[fetchDataSanPham]", payload);
    return axios.get(`${URL}/san-pham?pagenumber=${payload.pagenumber}&perPage=10`)
};
export const fetchDataSanPhamSold = (payload) => axios.get(`${URL}/san-pham/sold?pagenumber=${payload.pagenumber}&perPage=10`);

export const fetchUpdateLike = (payload) => axios.get(`${URL}/san-pham/like?_id=${payload._id}&like=${payload.like}`);
export const fetchUploadImage = (payload) => axios.post(`${URL}/file/upload`, payload);
export const fetchUpdateInfor = (payload) => axios.post(`${URL}/account/editinforuser`,payload);
export const fetchAddCart = (payload) => axios.get(`${URL}/gio-hang?id_Account=${payload.id_Account}&_id=${payload._id}&tenSanPham=${payload.tenSanPham}&giaSanPham=${payload.giaSanPham}&soLuong=${payload.soLuong}&tongGiaBan=${payload.tongGiaBan}&img=${payload.img}&typeProduct=${payload.typeProduct}&flashSale=${payload.flashSale}&price=${payload.price}&priceSale=${payload.priceSale}`);
export const fetchUpdateCart = (payload) => axios.post(`${URL}/gio-hang/update`,payload);
export const fetchDataCart = (payload) => axios.get(`${URL}/gio-hang/data?id_Account=${payload.id_Account}`);
export const fetchDelCart = (payload) => axios.post(`${URL}/gio-hang/delete`,payload);

export const fetchTimKiem = (payload) => axios.get(`${URL}/san-pham/search?text=${payload}`);
export const fetchAddNoti = (payload) => axios.post(`${URL}/notifi/add?title=${payload.title}&body=${payload.body}&id_hoadon=${payload.id_hoadon}&id_Account=${payload.id_Account}`);
export const fetchAddPayment = (payload) => axios.post(`${URL}/thanh-toan/?nameUser=${payload.nameUser}&address=${payload.address}&phoneNumber=${payload.phoneNumber}&tongThanhToan=${payload.tongThanhToan}&ship=${payload.ship}&type=${payload.type}&specificaddress=${payload.specificaddress}&id_Account=${payload.id_Account}`,payload);

export const fetchOrderStatus = (payload) => axios.post(`${URL}/thanh-toan/orderstatus?iduser=${payload.iduser}`);
export const fetchDeleteOrderStatus = (payload) => axios.post(`${URL}/thanh-toan/deleteorderuser`,payload)
export const fetchChangeAddress = (payload) => axios.post(`${URL}/account/changeaddress`,payload);