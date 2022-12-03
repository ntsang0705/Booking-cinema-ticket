import { GROUPID } from "../utils/settings/config";
import { baseService } from "./baseService";

export class QuanLyNguoiDungServices extends baseService {
	dangNhap = (thongTinDangNhap) => {
		return this.post("QuanLyNguoiDung/DangNhap", thongTinDangNhap);
	};
	layThongTinNguoiDung = () => {
		return this.post("QuanLyNguoiDung/ThongTinTaiKhoan");
	};
	layDanhSachNguoiDung = (tuKhoa) => {
		if (tuKhoa === "") {
			return this.get(`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`);
		}
		return this.get(`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${tuKhoa}`);
	};
	layDSLoaiNguoiDung = () => {
		return this.get("QuanLyNguoiDung/LayDanhSachLoaiNguoiDung");
	};
	themNguoiDung = (newUser) => {
		return this.post("QuanLyNguoiDung/ThemNguoiDung", newUser);
	};
	capNhatThongTinNguoiDung = (user) => {
		return this.post("QuanLyNguoiDung/CapNhatThongTinNguoiDung", user);
	};
	xoaNguoiDung = (userID) => {
		return this.delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${userID}`);
	};
	dangKy = (newUser) => {
		return this.post("QuanLyNguoiDung/DangKy", newUser);
	};
}

export const quanLyNguoiDungServices = new QuanLyNguoiDungServices();
