import React, { useEffect } from "react";

import { Button, Form, Input, Select } from "antd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { layDSLoaiNguoiDungAction, themNguoiDungAction } from "../../../../redux/actions/QuanLyNguoiDungAction";
import { GROUPID } from "../../../../utils/settings/config";
import { validationUserInfo } from "../../../../_core/schemas/validation";

export default function Adduser(props) {
	const dispatch = useDispatch();
	const { userTypes } = useSelector((state) => state.QuanLyNguoiDungReducer);
	const formik = useFormik({
		initialValues: {
			taiKhoan: "",
			matKhau: "",
			email: "",
			soDt: "",
			maNhom: GROUPID,
			maLoaiNguoiDung: "",
			hoTen: "",
		},
		validationSchema: validationUserInfo,
		onSubmit: (values) => {
			dispatch(themNguoiDungAction(values));
		},
	});
	useEffect(() => {
		dispatch(layDSLoaiNguoiDungAction());
	}, []);
	const onChange = (value) => {
		formik.setFieldValue("maLoaiNguoiDung", value);
	};
	return (
		<div className="h-full flex flex-col justify-center">
			<Form
				onSubmitCapture={formik.handleSubmit}
				layout="vertical"
				labelCol={{ span: 10 }}
				wrapperCol={{ span: "100%" }}
				size="large">
				<div
					className="w-2/3 mx-auto border-2 bg-gray-200 p-5 rounded-lg "
					style={{ boxShadow: "2px 4px 10px 1px rgba(201,201,201,0.47)" }}>
					<h3 className="text-2xl text-gray-600 font-bold text-center">THÊM NGƯỜI DÙNG</h3>
					<div className="flex justify-center">
						<div className="w-full p-5">
							<Form.Item label="Tài Khoản">
								<Input
									name="taiKhoan"
									onChange={formik.handleChange}
									value={formik.values.taiKhoan}
									style={formik.errors.taiKhoan ? { borderColor: "red" } : {}}
								/>
								{formik.errors.taiKhoan && <p className="text-red-600">{formik.errors.taiKhoan}</p>}
							</Form.Item>
							<Form.Item label="Mật khẩu">
								<Input
									type="password"
									name="matKhau"
									value={formik.values.matKhau}
									onChange={formik.handleChange}
									style={formik.errors.matKhau ? { borderColor: "red" } : {}}
								/>
								{formik.errors.matKhau && <p className="text-red-600">{formik.errors.matKhau}</p>}
							</Form.Item>
							<Form.Item label="Nhập lại mật khẩu">
								<Input
									type="password"
									name="matKhauNhapLai"
									onChange={formik.handleChange}
									style={formik.errors.matKhauNhapLai ? { borderColor: "red" } : {}}
								/>
								{formik.errors.matKhauNhapLai && <p className="text-red-600">{formik.errors.matKhauNhapLai}</p>}
							</Form.Item>
						</div>
						<div className="w-full p-5">
							<Form.Item label="Họ tên">
								<Input
									name="hoTen"
									value={formik.values.hoTen}
									onChange={formik.handleChange}
									style={formik.errors.hoTen ? { borderColor: "red" } : {}}
								/>
								{formik.errors.hoTen && <p className="text-red-600">{formik.errors.hoTen}</p>}
							</Form.Item>
							<Form.Item label="Email">
								<Input
									name="email"
									value={formik.values.email}
									onChange={formik.handleChange}
									style={formik.errors.email ? { borderColor: "red" } : {}}
								/>
								{formik.errors.email && <p className="text-red-600">{formik.errors.email}</p>}
							</Form.Item>
							<Form.Item label="Số điện thoại">
								<Input
									type="number"
									name="soDt"
									value={formik.values.soDt}
									onChange={formik.handleChange}
									style={formik.errors.soDt ? { borderColor: "red" } : {}}
								/>
								{formik.errors.soDt && <p className="text-red-600">{formik.errors.soDt}</p>}
							</Form.Item>
							<Form.Item label="Loại người dùng">
								<Select
									onChange={onChange}
									style={
										formik.errors.maLoaiNguoiDung ? { borderColor: "red", width: "100%" } : { width: "100%" }
									}
									options={userTypes.map((type, index) => {
										return { label: type.tenLoai, value: type.maLoaiNguoiDung };
									})}
								/>
								{formik.errors.maLoaiNguoiDung && (
									<p className="text-red-600">{formik.errors.maLoaiNguoiDung}</p>
								)}
							</Form.Item>
							<div className="flex justify-end">
								<Button htmlType="submit" type="primary" disabled={!formik.isValid}>
									Thêm
								</Button>
							</div>
						</div>
					</div>
				</div>
			</Form>
		</div>
	);
}
