import React, { useEffect } from "react";

import { Button, Form, Input, Select } from "antd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
	capNhatThongTinNguoiDungAction,
	layDanhSachNguoiDungAction,
	layDSLoaiNguoiDungAction,
} from "../../../../redux/actions/QuanLyNguoiDungAction";
import { GROUPID } from "../../../../utils/settings/config";

export default function EditUser(props) {
	const dispatch = useDispatch();
	const { userTypes } = useSelector((state) => state.QuanLyNguoiDungReducer);
	const user = useSelector((state) => state.QuanLyNguoiDungReducer.users[0]);
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			taiKhoan: user.taiKhoan,
			matKhau: user.matKhau,
			email: user.email,
			soDt: user.soDt,
			maNhom: GROUPID,
			maLoaiNguoiDung: user.maLoaiNguoiDung,
			hoTen: user.hoTen,
		},
		onSubmit: (values) => {
			dispatch(capNhatThongTinNguoiDungAction(values));
		},
	});
	useEffect(() => {
		const { id } = props.match.params;
		dispatch(layDSLoaiNguoiDungAction());
		dispatch(layDanhSachNguoiDungAction(id));
	}, []);
	const onChange = (value) => {
		formik.setFieldValue("maLoaiNguoiDung", value);
	};
	return (
		<Form
			onSubmitCapture={formik.handleSubmit}
			layout="vertical"
			labelCol={{ span: 10 }}
			wrapperCol={{ span: "100%" }}
			size="large">
			<h3>Cập nhật người dùng</h3>
			<div className="grid grid-cols-4 gap-5 ">
				<div className="col-start-2">
					<Form.Item label="Tài Khoản">
						<Input disabled name="taiKhoan" onChange={formik.handleChange} value={formik.values.taiKhoan} />
					</Form.Item>
					<Form.Item label="Mật khẩu">
						<Input name="matKhau" value={formik.values.matKhau} onChange={formik.handleChange} />
					</Form.Item>
					<Form.Item label="Họ tên">
						<Input name="hoTen" value={formik.values.hoTen} onChange={formik.handleChange} />
					</Form.Item>
				</div>
				<div className="col-start-3">
					<Form.Item label="Email">
						<Input name="email" value={formik.values.email} onChange={formik.handleChange} />
					</Form.Item>
					<Form.Item label="Số điện thoại">
						<Input name="soDt" value={formik.values.soDt} onChange={formik.handleChange} />
					</Form.Item>
					<Form.Item label="Loại người dùng">
						<Select
							value={formik.values.maLoaiNguoiDung}
							onChange={onChange}
							style={{ width: "100%" }}
							options={userTypes.map((type, index) => {
								return { label: type.tenLoai, value: type.maLoaiNguoiDung };
							})}
						/>
					</Form.Item>
					<div className="flex justify-end">
						<Button htmlType="submit" type="primary">
							Lưu
						</Button>
					</div>
				</div>
			</div>
		</Form>
	);
}
