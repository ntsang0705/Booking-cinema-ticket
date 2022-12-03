class ThongTinPhim {
	maLichChieu = "";
	tenCumRap = "";
	tenRap = "";
	diaChi = "";
	tenPhim = "";
	hinhAn = "";
	ngayChieu = "";
	gioChieu = "";
}
class Ghe {
	maGhe = "";
	tenGhe = "";
	maRap = "";
	loaiGhe = "";
	stt = "";
	giaVe = "";
	daDat = "";
	taiKhoanNguoiDat = "";
}
export class ThongTinLichChieu {
	thongTinPhim = new ThongTinPhim();
	danhSachGhe = new Array(new Ghe());
}
