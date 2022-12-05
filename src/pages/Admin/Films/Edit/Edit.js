import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, InputNumber, Switch } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { capNhatPhimUploadAction, layThongTinPhimAction } from "../../../../redux/actions/QuanLyPhimAction";
import { GROUPID } from "../../../../utils/settings/config";
import { validationFilmInfo } from "../../../../_core/schemas/validation";

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
		validationSchema: validationFilmInfo,
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
		<div className="h-full flex flex-col justify-center ">
			<Form
				onSubmitCapture={formik.handleSubmit}
				labelCol={{
					span: 4,
				}}
				wrapperCol={{
					span: "100%",
				}}
				layout="horizontal"
				size="large">
				<div
					className="w-2/3 mx-auto border-2 bg-gray-200 px-5 rounded-lg"
					style={{ boxShadow: "2px 4px 10px 1px rgba(201,201,201,0.47)" }}>
					<h3 className="text-2xl font-bold text-gray-600 text-center mt-3 ">CHỈNH SỬA THÔNG TIN PHIM</h3>
					<Form.Item label="Tên phim">
						<Input
							name="tenPhim"
							onChange={formik.handleChange}
							value={formik.values.tenPhim}
							style={formik.errors.tenPhim ? { borderColor: "red" } : {}}
						/>
						{formik.errors.tenPhim && <p className="text-red-600">{formik.errors.tenPhim}</p>}
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
						<Button htmlType="submit" type="primary" disabled={!formik.isValid}>
							Cập nhật
						</Button>
					</Form.Item>
				</div>
			</Form>
		</div>
	);
}
