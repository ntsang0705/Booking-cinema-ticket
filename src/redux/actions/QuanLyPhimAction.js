import { quanLyPhimServices } from "../../services/QuanLyPhimServices";
import { SET_DANH_SACH_PHIM, SET_THONG_TIN_FILM } from "../types/QuanLyPhimType";
import {history} from '../../App'

export const layDSPhimAction = (tenPhim) => {
	return async (dispatch) => {
		try {
			const result = await quanLyPhimServices.layDanhSachPhim(tenPhim);
			dispatch({ type: SET_DANH_SACH_PHIM, arrFilm: result.data.content });
		} catch (error) {
			console.log(error);
		}
	};
};

export const themPhimUploadHinhAction = (formData) => {
	return async (dispatch) => {
		try {
			const { data } = await quanLyPhimServices.themPhimUploadHinh(formData);
			alert("Thanh cong");
		} catch (error) {
			console.log(error.response.data);
		}
	};
};

export const layThongTinPhimAction = (maPhim) => {
	return async (dispatch) => {
		try {
			const { data } = await quanLyPhimServices.layThongTinPhim(maPhim);
			dispatch({ type: SET_THONG_TIN_FILM, thongTinPhim: data.content });
		} catch (error) {
			console.log(error.response.data);
		}
	};
};

export const capNhatPhimUploadAction = (formData)=>{
	return async (dispatch) => {
		try {
			const { data } = await quanLyPhimServices.capNhatPhimUpload(formData);
			dispatch(layDSPhimAction())
			history.push("/admin/films")
		} catch (error) {
			console.log(error.response?.data);
		}
	};
}

export const xoaPhimAction = (maPhim)=>{
	return async (dispatch) => {
		try {
			const { data } = await quanLyPhimServices.xoaPhim(maPhim);
			
			dispatch(layDSPhimAction())
			
		} catch (error) {
			console.log(error.response?.data);
		}
	};
}