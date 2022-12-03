import { ThongTinLichChieu } from "../../_core/models/ThongTinPhongVe";
import { CHUYEN_TAB, DAT_VE, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from "../types/QuanLyDatVeType";

const initialState = {
	chiTietPhongVe: new ThongTinLichChieu(),
	danhSachGheDangDat: [],
	danhSachGheKhachDat: [],
	tabActive: 1,
};

export const QuanLyDatVeReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CHI_TIET_PHONG_VE:
			return { ...state, chiTietPhongVe: action.chiTietPhongVe };
		case DAT_VE:
			let danhSachGheCapNhat = [...state.danhSachGheDangDat];
			let index = danhSachGheCapNhat.findIndex((gheDD) => gheDD.maGhe === action.gheDuocChon.maGhe);
			if (index !== -1) {
				danhSachGheCapNhat.splice(index, 1);
			} else {
				danhSachGheCapNhat.push(action.gheDuocChon);
			}
			return { ...state, danhSachGheDangDat: danhSachGheCapNhat };
		case DAT_VE_HOAN_TAT:
			state.danhSachGheDangDat = [];
			return { ...state };
		case CHUYEN_TAB:
			state.tabActive = action.number;
			return { ...state };
		default:
			return state;
	}
};
