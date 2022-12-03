import React, { useState } from "react";
import { DatePicker, Form, Input, InputNumber, Switch } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch } from "react-redux";
import { themPhimUploadHinhAction } from "../../../../redux/actions/QuanLyPhimAction";
import { GROUPID } from "../../../../utils/settings/config";
export default function Addnew(props) {
	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			tenPhim: "",
			trailer: "",
			moTa: "",
			ngayKhoiChieu: "",
			dangChieu: false,
			sapChieu: false,
			hot: false,
			danhGia: 0,
			hinhAnh: {},
			maNhom: GROUPID,
		},

		onSubmit: (values) => {
			let formData = new FormData();

			for (let key in values) {
				if (key === "hinhAnh") {
					formData.append("File", values.hinhAnh, values.hinhAnh.name);
				} else {
					formData.append(key, values[key]);
				}
			}
			dispatch(themPhimUploadHinhAction(formData));
		},
	});
	const [img, setImg] = useState("");
	const handleChangeDatePicker = (value) => {
		let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
		formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
	};
	const handleChangeSwitch = (name) => {
		return (value) => {
			formik.setFieldValue(name, value);
		};
	};
	const handleChangFile = (e) => {
		let file = e.target.files[0];

		if (
			file.type === "image/png" ||
			file.type === "image/jpg" ||
			file.type === "image/jpeg" ||
			file.type === "image/gif"
		) {
			let reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onload = (e) => {
				setImg(e.target.result);
			};
		}
		formik.setFieldValue("hinhAnh", file);
	};
	return (
		<Form
			onSubmitCapture={formik.handleSubmit}
			labelCol={{
				span: 4,
			}}
			wrapperCol={{
				span: 14,
			}}
			layout="horizontal"
			size="large">
			<h3>Thêm phim mới</h3>
			<Form.Item label="Tên phim">
				<Input name="tenPhim" onChange={formik.handleChange} />
			</Form.Item>
			<Form.Item label="Trailer">
				<Input name="trailer" onChange={formik.handleChange} />
			</Form.Item>
			<Form.Item label="Mô tả">
				<Input name="moTa" onChange={formik.handleChange} />
			</Form.Item>
			<Form.Item label="Ngày khởi chiếu">
				<DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} />
			</Form.Item>
			<Form.Item label="Đang chiếu" valuePropName="checked" onChange={handleChangeSwitch("dangChieu")}>
				<Switch />
			</Form.Item>
			<Form.Item label="Sắp chiếu" valuePropName="checked" onChange={handleChangeSwitch("sapChieu")}>
				<Switch />
			</Form.Item>
			<Form.Item label="Hot" valuePropName="checked" onChange={handleChangeSwitch("hot")}>
				<Switch />
			</Form.Item>
			<Form.Item label="Đánh giá">
				<InputNumber onChange={(value) => formik.setFieldValue("danhGia", value)} min={0} max={10} />
			</Form.Item>
			<Form.Item label="Hình ảnh">
				<input type="file" onChange={handleChangFile} accept="image/png, image/gif, image/jpeg" />
				<img style={{ width: 150, height: 150, marginTop: 15 }} src={img} alt="" />
			</Form.Item>
			<Form.Item>
				<button type="submit" className="bg-green-600 text-white text-base p-3 ">
					Thêm phim
				</button>
			</Form.Item>
		</Form>
	);
}
