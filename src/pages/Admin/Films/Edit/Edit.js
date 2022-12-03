import React, { useEffect, useState } from "react";
import { DatePicker, Form, Input, InputNumber, Switch } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { capNhatPhimUploadAction, layThongTinPhimAction } from "../../../../redux/actions/QuanLyPhimAction";
import { GROUPID } from "../../../../utils/settings/config";

export default function Edit(props) {
	const dispatch = useDispatch();
	const { thongTinPhim } = useSelector((state) => state.QuanLyPhimReducer);

	useEffect(() => {
		const { id } = props.match.params;
		dispatch(layThongTinPhimAction(id));
	}, []);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			maPhim: thongTinPhim.maPhim,
			tenPhim: thongTinPhim.tenPhim,
			trailer: thongTinPhim.trailer,
			moTa: thongTinPhim.moTa,
			ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
			dangChieu: thongTinPhim.dangChieu,
			sapChieu: thongTinPhim.sapChieu,
			hot: thongTinPhim.hot,
			danhGia: thongTinPhim.danhGia,
			hinhAnh: null,
			maNhom: GROUPID,
		},

		onSubmit: (values) => {
			console.log(values);
			let formData = new FormData();

			for (let key in values) {
				if (key === "hinhAnh") {
					if (values.hinhAnh !== null) {
						formData.append("File", values.hinhAnh, values.hinhAnh.name);
					}
				} else {
					formData.append(key, values[key]);
				}
			}

			dispatch(capNhatPhimUploadAction(formData));
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
	const handleChangFile = async (e) => {
		let file = e.target.files[0];

		if (
			file.type === "image/png" ||
			file.type === "image/jpg" ||
			file.type === "image/jpeg" ||
			file.type === "image/gif"
		) {
			await formik.setFieldValue("hinhAnh", file);
			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (e) => {
				setImg(e.target.result);
			};
		}
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
			<h3>Chỉnh sửa phim </h3>
			<Form.Item label="Tên phim">
				<Input name="tenPhim" onChange={formik.handleChange} value={formik.values.tenPhim} />
			</Form.Item>
			<Form.Item label="Trailer">
				<Input name="trailer" onChange={formik.handleChange} value={formik.values.trailer} />
			</Form.Item>
			<Form.Item label="Mô tả">
				<Input name="moTa" onChange={formik.handleChange} value={formik.values.moTa} />
			</Form.Item>
			<Form.Item label="Ngày khởi chiếu">
				<DatePicker
					format={"DD/MM/YYYY"}
					onChange={handleChangeDatePicker}
					value={moment(formik.values.ngayKhoiChieu, [moment.ISO_8601, "DD/MM/YYYY"])}
				/>
			</Form.Item>
			<Form.Item label="Đang chiếu" valuePropName="checked">
				<Switch checked={formik.values.dangChieu} onChange={handleChangeSwitch("dangChieu")} />
			</Form.Item>
			<Form.Item label="Sắp chiếu">
				<Switch checked={formik.values.sapChieu} onChange={handleChangeSwitch("sapChieu")} />
			</Form.Item>
			<Form.Item label="Hot">
				<Switch checked={formik.values.hot} onChange={handleChangeSwitch("hot")} />
			</Form.Item>
			<Form.Item label="Đánh giá">
				<InputNumber
					onChange={(value) => formik.setFieldValue("danhGia", value)}
					min={0}
					max={10}
					value={formik.values.danhGia}
				/>
			</Form.Item>
			<Form.Item label="Hình ảnh">
				<input type="file" onChange={handleChangFile} accept="image/png, image/gif, image/jpeg" />
				<img
					style={{ width: 150, height: 150, marginTop: 15 }}
					src={img === "" ? thongTinPhim.hinhAnh : img}
					alt=""
				/>
			</Form.Item>
			<Form.Item>
				<button type="submit" className="bg-green-600 text-white text-base p-3 ">
					Cập nhật
				</button>
			</Form.Item>
		</Form>
	);
}
