import { SET_CHI_TIET_PHIM, SET_HE_THONG_RAP_CHIEU } from "../types/QuanLyRapType";

const initialState = {
	heThongRapChieu: [],
	filmDetail: {},
};

export const QuanLyRapReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_HE_THONG_RAP_CHIEU:
			return { ...state, heThongRapChieu: action.heThongRapChieu };
		case SET_CHI_TIET_PHIM:
			return { ...state, filmDetail: action.filmDetail };
		default:
			return state;
	}
};
