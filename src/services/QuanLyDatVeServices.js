import { ThongTinDatVe } from "../_core/models/ThongTinDatVe";
import { baseService } from "./baseService";

export class QuanLyDatVeServices extends baseService {
	layChiTietPhongVe = (maLichChieu) => {
		return this.get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
	};
	datVe = (thongTinDatVe = new ThongTinDatVe()) => {
		return this.post(`QuanLyDatVe/DatVe`, thongTinDatVe);
	};
	taoLichChieu = (thongTinLichChieu) => {
		return this.post("QuanLyDatVe/TaoLichChieu", thongTinLichChieu);
	};
}

export const quanLyDatVeServices = new QuanLyDatVeServices();
