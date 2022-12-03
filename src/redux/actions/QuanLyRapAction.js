import { quanLyRapServices } from "../../services/QuanLyRapServices";
import { SET_CHI_TIET_PHIM, SET_HE_THONG_RAP_CHIEU } from "../types/QuanLyRapType";

export const layDSHeThongRapAction = () => {
	return async (dispatch) => {
		try {
			const result = await quanLyRapServices.layDanhSachHeThongRap();
			if (result.status === 200) {
				dispatch({ type: SET_HE_THONG_RAP_CHIEU, heThongRapChieu: result.data.content });
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const layThongTinChiTietPhimAction = (id) => {
	return async (dispatch) => {
		try {
			const result = await quanLyRapServices.layThongTinLichChieuPhim(id);
			if (result.status === 200) {
				dispatch({ type: SET_CHI_TIET_PHIM, filmDetail: result.data.content });
			}
		} catch (error) {
			console.log(error);
		}
	};
};
