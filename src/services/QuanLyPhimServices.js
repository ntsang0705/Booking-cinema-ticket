import { GROUPID } from "../utils/settings/config";
import { baseService } from "./baseService";

export class QuanLyPhimServices extends baseService {
	layDanhSachBanner = () => {
		return this.get("QuanLyPhim/LayDanhSachBanner");
	};
	layDanhSachPhim = (tenPhim) => {
		if (tenPhim === "") {
			return this.get(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`);
		}
		return this.get(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${tenPhim}`);
	};
	themPhimUploadHinh = (formData) => {
		return this.post(`QuanLyPhim/ThemPhimUploadHinh`, formData);
	};
	layThongTinPhim = (maPhim) => {
		return this.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
	};
	capNhatPhimUpload = (formData) => {
		return this.post("QuanLyPhim/CapNhatPhimUpload", formData);
	};
	xoaPhim = (maPhim) => {
		return this.delete(`QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
	};
}

export const quanLyPhimServices = new QuanLyPhimServices();
