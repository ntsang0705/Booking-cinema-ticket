import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, InputNumber, Select } from "antd";
import { quanLyRapServices } from "../../../../services/QuanLyRapServices";
import { useFormik } from "formik";
import moment from "moment";
import { quanLyDatVeServices } from "../../../../services/QuanLyDatVeServices";
import { validationShowTime } from "../../../../_core/schemas/validation";

export default function ShowTime(props) {
	const formik = useFormik({
		initialValues: {
			maPhim: props.match.params.id,
			ngayChieuGioChieu: "",
			maRap: "",
			giaVe: "",
		},
		validationSchema: validationShowTime,
		onSubmit: async (values) => {
			try {
				const { data } = await quanLyDatVeServices.taoLichChieu(values);
			} catch (error) {
				console.log(error.response?.data);
			}
		},
	});
	const [state, setState] = useState({
		heThongRapChieu: [],
		cumRapChieu: [],
	});
	useEffect(() => {
		async function fectchData() {
			try {
				let { data } = await quanLyRapServices.layThongTinHeThongRap();
				setState({
					...state,
					heThongRapChieu: data.content,
				});
			} catch (error) {
				console.log(error.response.data);
			}
		}
		fectchData();
	}, []);

	const handleChangeHTR = async (value) => {
		try {
			let { data } = await quanLyRapServices.layThongTinCumRap(value);

			setState({
				...state,
				cumRapChieu: data.content,
			});
		} catch (error) {
			console.log(error.response.data);
		}
	};
	const handleChangeValue = (name) => {
		return (value) => {
			formik.setFieldValue(name, value);
		};
	};
	const onChangeDate = (value) => {
		formik.setFieldValue("ngayChieuGioChieu", moment(value).format("DD/MM/YYYY hh:mm:ss"));
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
					className="w-1/2 mx-auto border-2 bg-gray-200 p-5 rounded-lg"
					style={{ boxShadow: "2px 4px 10px 1px rgba(201,201,201,0.47)" }}>
					<h3 className="text-2xl text-gray-600 font-bold text-center">TẠO LỊCH CHIẾU</h3>

					<Form.Item label="Hệ thống rạp">
						<Select
							onChange={handleChangeHTR}
							options={state.heThongRapChieu?.map((htr, index) => ({
								label: htr.tenHeThongRap,
								value: htr.maHeThongRap,
							}))}
						/>
					</Form.Item>
					<Form.Item label="Cụm rạp">
						<Select
							onChange={handleChangeValue("maRap")}
							options={state.cumRapChieu?.map((cumRap, index) => ({
								label: cumRap.tenCumRap,
								value: cumRap.maCumRap,
							}))}
						/>
						{formik.errors.maRap && <p className="text-red-600">{formik.errors.maRap}</p>}
					</Form.Item>
					<Form.Item label="Ngày chiếu, giờ chiếu">
						<DatePicker name="ngayChieuGioChieu" format="DD/MM/YYYY hh:mm:ss" showTime onOk={onChangeDate} />
						{formik.errors.ngayChieuGioChieu && <p className="text-red-600">{formik.errors.ngayChieuGioChieu}</p>}
					</Form.Item>
					<Form.Item label="Giá vé">
						<InputNumber
							min={1}
							max={150000}
							onChange={handleChangeValue("giaVe")}
							style={formik.errors.giaVe ? { borderColor: "red" } : {}}
						/>
						{formik.errors.giaVe && <p className="text-red-600">{formik.errors.giaVe}</p>}
					</Form.Item>

					<Form.Item>
						<Button htmlType="submit" type="primary" size="large" disabled={!formik.isValid}>
							Tạo lịch chiếu
						</Button>
					</Form.Item>
				</div>
			</Form>
		</div>
	);
}
