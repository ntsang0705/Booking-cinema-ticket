import { quanLyDatVeServices } from "../../services/QuanLyDatVeServices";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";

import { CHUYEN_TAB, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from "../types/QuanLyDatVeType";
import { hideLoadingAction, showLoadingAction } from "./LoadingAction";

export const layChiTietPhongVeAction = (maLichChieu) => {
	return async (dispatch) => {
		try {
			const { data } = await quanLyDatVeServices.layChiTietPhongVe(maLichChieu);

			dispatch({ type: SET_CHI_TIET_PHONG_VE, chiTietPhongVe: data.content });
		} catch (error) {
			console.log(error.response.data);
		}
	};
};

export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
	return async (dispatch) => {
		try {
			dispatch(showLoadingAction);
			const { data } = await quanLyDatVeServices.datVe(thongTinDatVe);
			await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu));
			await dispatch({ type: DAT_VE_HOAN_TAT });
			await dispatch(hideLoadingAction);
			const tabActive = 2;
			await dispatch({ type: CHUYEN_TAB, number: tabActive });
		} catch (error) {
			console.log(error.response.data);
		}
	};
};
