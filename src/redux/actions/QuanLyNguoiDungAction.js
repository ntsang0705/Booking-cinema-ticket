import { quanLyNguoiDungServices } from "../../services/QuanLyNguoiDung";
import {
	DANG_NHAP,
	LAY_DANH_SACH_LOAI_NGUOI_DUNG,
	LAY_DANH_SACH_NGUOI_DUNG,
	SET_THONG_TIN_NGUOI_DUNG,
} from "../types/QuanLyNguoiDungType";
import { history } from "../../App";

export const dangNhapAction = (thongTinDangNhap) => {
	return async (dispatch) => {
		try {
			const { data } = await quanLyNguoiDungServices.dangNhap(thongTinDangNhap);

			if (data.statusCode === 200) {
				dispatch({ type: DANG_NHAP, thongTinDangNhap: data.content });
			}
			history.goBack();
		} catch (error) {
			console.log(error.response.data);
			alert(error?.response.data.content);
		}
	};
};

export const layThongTinNguoiDungAction = () => {
	return async (dispatch) => {
		try {
			const { data } = await quanLyNguoiDungServices.layThongTinNguoiDung();
			if (data.statusCode === 200) {
				dispatch({ type: SET_THONG_TIN_NGUOI_DUNG, thongTinNguoiDung: data.content });
			}
		} catch (error) {
			console.log(error.response.data);
		}
	};
};

export const layDanhSachNguoiDungAction = (tuKhoa) => {
	return async (dispatch) => {
		try {
			const { data } = await quanLyNguoiDungServices.layDanhSachNguoiDung(tuKhoa);
			if (data.statusCode === 200) {
				dispatch({ type: LAY_DANH_SACH_NGUOI_DUNG, users: data.content });
			}
		} catch (error) {
			console.log(error.response?.data);
		}
	};
};

export const layDSLoaiNguoiDungAction = () => {
	return async (dispatch) => {
		try {
			const { data } = await quanLyNguoiDungServices.layDSLoaiNguoiDung();
			if (data.statusCode === 200) {
				dispatch({ type: LAY_DANH_SACH_LOAI_NGUOI_DUNG, userTypes: data.content });
			}
		} catch (error) {
			console.log(error.response?.data);
		}
	};
};

export const themNguoiDungAction = (newUser) => {
	return async (dispatch) => {
		try {
			const { data } = await quanLyNguoiDungServices.themNguoiDung(newUser);
			if (data.statusCode === 200) {
				dispatch(layThongTinNguoiDungAction());
				alert("Thêm thành công");
			}
		} catch (error) {
			console.log(error.response?.data);
		}
	};
};

export const capNhatThongTinNguoiDungAction = (user) => {
	return async (dispatch) => {
		try {
			const { data } = await quanLyNguoiDungServices.capNhatThongTinNguoiDung(user);
			if (data.statusCode === 200) {
				alert("Cập nhật thành công");
				history.push("/admin/users");
			}
		} catch (error) {
			console.log(error.response?.data);
		}
	};
};

export const capNhatThongTinNguoiDungDangNhapAction = (user) => {
	return async (dispatch) => {
		try {
			const { data } = await quanLyNguoiDungServices.capNhatThongTinNguoiDungDangNhap(user);
			if (data.statusCode === 200) {
				alert("Cập nhật thành công");
				window.location.reload();
			}
		} catch (error) {
			console.log(error.response?.data);
		}
	};
};

export const xoaNguoiDungAction = (userID) => {
	return async (dispatch) => {
		try {
			const { data } = await quanLyNguoiDungServices.xoaNguoiDung(userID);
			if (data.statusCode === 200) {
				alert("Xóa thành công");
				dispatch(layDanhSachNguoiDungAction(""));
			}
		} catch (error) {
			console.log(error.response?.data);
			alert(`${error.response?.data.content}`);
		}
	};
};

export const dangKyAction = (newUser) => {
	return async (dispatch) => {
		try {
			const { data } = await quanLyNguoiDungServices.dangKy(newUser);
			if (data.statusCode === 200) {
				alert("Thêm thành công");
			}
		} catch (error) {
			console.log(error.response?.data);
		}
	};
};
