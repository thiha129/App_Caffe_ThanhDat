import { combineReducers } from "redux";
import account from "./account";
import accountRegister from "./account.register";
import forgetpassword from './forgetpassword'
import posts from "./posts";
import sanPham from './sanPham'
import sanPhamSold from './sanPhamSold'
import notifis from "./notifis";
import addnotifi from "./addnotifi";
import uploadimg from "./uploadimg";
import updateInforUser from "./updateInforUser.";
import cart from "./cart";
import dataCart from "./dataCart";
import dataSearch from "./dataSearch";
import buyNow from "./buyNow";
import allUser from "./alluser";
import payment from "./payment";
import order from "./orderStatus";
import address from "./address";
export default combineReducers({
  account,
  accountRegister,
  posts,
  notifis,
  addnotifi,
  forgetpassword,
  sanPham,
  sanPhamSold,
  uploadimg,
  updateInforUser,
  cart,
  dataCart,
  dataSearch,
  buyNow,
  allUser,
  payment,
  order,
  address
});
