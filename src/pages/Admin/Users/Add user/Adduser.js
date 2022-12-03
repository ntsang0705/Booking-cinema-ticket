import React, { useEffect } from "react";

import { Button, Form, Input, InputNumber, Select } from "antd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { layDSLoaiNguoiDungAction, themNguoiDungAction } from "../../../../redux/actions/QuanLyNguoiDungAction";
import { GROUPID } from "../../../../utils/settings/config";

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
		<Form
			onSubmitCapture={formik.handleSubmit}
			layout="vertical"
			labelCol={{ span: 10 }}
			wrapperCol={{ span: "100%" }}
			size="large">
			<h3>Thêm người dùng</h3>
			<div className="grid grid-cols-4 gap-5 ">
				<div className="col-start-2">
					<Form.Item label="Tài Khoản">
						<Input name="taiKhoan" onChange={formik.handleChange} />
					</Form.Item>
					<Form.Item label="Mật khẩu">
						<Input name="matKhau" onChange={formik.handleChange} />
					</Form.Item>
					<Form.Item label="Họ tên">
						<Input name="hoTen" onChange={formik.handleChange} />
					</Form.Item>
				</div>
				<div className="col-start-3">
					<Form.Item label="Email">
						<Input name="email" onChange={formik.handleChange} />
					</Form.Item>
					<Form.Item label="Số điện thoại">
						<Input name="soDt" onChange={formik.handleChange} />
					</Form.Item>
					<Form.Item label="Loại người dùng">
						<Select
							onChange={onChange}
							style={{ width: "100%" }}
							options={userTypes.map((type, index) => {
								return { label: type.tenLoai, value: type.maLoaiNguoiDung };
							})}
						/>
					</Form.Item>
					<div className="flex justify-end">
						<Button htmlType="submit" type="primary">
							Thêm
						</Button>
					</div>
				</div>
			</div>
		</Form>
	);
}
