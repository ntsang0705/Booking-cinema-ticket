import { message } from "antd";
import * as yup from "yup";

const reEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export const validationUserInfo = yup.object().shape({
	taiKhoan: yup.string().required("Không được bỏ trống"),
	matKhau: yup.string().required("Không được bỏ trống"),
	matKhauNhapLai: yup
		.string()
		.required("Không được bỏ trống")
		.oneOf([yup.ref("matKhau"), null], "Mật khẩu không trùng khớp"),
	email: yup.string().required("Không được bỏ trống").matches(reEmail, { message: "Email không hợp lệ" }),
	soDT: yup.number().positive("Số điện thoại không hợp lệ").integer("Số điện thoại không hợp lệ"),
	soDt: yup
		.number()
		.positive("Số điện thoại không hợp lệ")
		.integer("Số điện thoại không hợp lệ")
		.required("Không được bỏ trống"),
	hoTen: yup.string().required("Không được bỏ trống"),
	maLoaiNguoiDung: yup.string().required("Không được bỏ trống"),
});

export const validationFilmInfo = yup.object().shape({
	tenPhim: yup.string().required("Không được bỏ trống"),
});

export const validationShowTime = yup.object().shape({
	ngayChieuGioChieu: yup.string().required("Không được bỏ trống"),
	maRap: yup.string().required("Không được bỏ trống"),
	giaVe: yup.number().required("Không được bỏ trống"),
});
