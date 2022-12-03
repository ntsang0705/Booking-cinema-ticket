import { TOKEN, USER_LOGIN } from "../../utils/settings/config";
import {
	DANG_NHAP,
	LAY_DANH_SACH_LOAI_NGUOI_DUNG,
	LAY_DANH_SACH_NGUOI_DUNG,
	SET_THONG_TIN_NGUOI_DUNG,
} from "../types/QuanLyNguoiDungType";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
	user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
	userLogin: user,
	thongTinNguoiDung: {},
	users: [],
	userTypes: [],
};

export const QuanLyNguoiDungReducer = (state = initialState, action) => {
	switch (action.type) {
		case DANG_NHAP:
			localStorage.setItem(USER_LOGIN, JSON.stringify(action.thongTinDangNhap));
			localStorage.setItem(TOKEN, action.thongTinDangNhap.accessToken);
			return { ...state, userLogin: action.thongTinDangNhap };
		case SET_THONG_TIN_NGUOI_DUNG:
			return { ...state, thongTinNguoiDung: action.thongTinNguoiDung };
		case LAY_DANH_SACH_NGUOI_DUNG:
			return { ...state, users: action.users };
		case LAY_DANH_SACH_LOAI_NGUOI_DUNG:
			return { ...state, userTypes: action.userTypes };
		default:
			return state;
	}
};
