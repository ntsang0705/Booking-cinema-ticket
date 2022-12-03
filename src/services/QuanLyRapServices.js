import { baseService } from "./baseService";

export class QuanLyRapServices extends baseService {
	layDanhSachHeThongRap = () => {
		return this.get("QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP00");
	};
	layThongTinLichChieuPhim = (maPhim) => {
		return this.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`);
	};
	layThongTinHeThongRap = () => {
		return this.get(`QuanLyRap/LayThongTinHeThongRap`);
	};
	layThongTinCumRap = (maHeThongRap) => {
		return this.get(`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`);
	};
}

export const quanLyRapServices = new QuanLyRapServices();
