import {
	SET_DANH_SACH_PHIM,
	SET_FILM_DANG_CHIEU,
	SET_FILM_SAP_CHIEU,
	SET_THONG_TIN_FILM,
} from "../types/QuanLyPhimType";

const initialState = {
	arrFilm: [],
	arrFilmDefault: [],
	dangChieu: false,
	sapChieu: false,
	thongTinPhim: {},
};

export const QuanLyPhimReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_DANH_SACH_PHIM:
			state.arrFilm = action.arrFilm;
			state.arrFilmDefault = state.arrFilm;
			return { ...state };
		case SET_FILM_DANG_CHIEU:
			state.dangChieu = !state.dangChieu;
			state.sapChieu = false;
			if (!state.dangChieu) {
				return { ...state, arrFilm: state.arrFilmDefault };
			}
			return { ...state, arrFilm: state.arrFilmDefault.filter((film) => film.dangChieu === state.dangChieu) };
		case SET_FILM_SAP_CHIEU:
			state.sapChieu = !state.sapChieu;
			state.dangChieu = false;
			if (!state.sapChieu) {
				return { ...state, arrFilm: state.arrFilmDefault };
			}
			return { ...state, arrFilm: state.arrFilmDefault.filter((film) => film.sapChieu === state.sapChieu) };
		case SET_THONG_TIN_FILM:
			return { ...state, thongTinPhim: action.thongTinPhim };
		default:
			return { ...state };
	}
};
