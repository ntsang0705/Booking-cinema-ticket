import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, InputNumber, Select } from "antd";
import { quanLyRapServices } from "../../../../services/QuanLyRapServices";
import { useFormik } from "formik";
import moment from "moment";
import { quanLyDatVeServices } from "../../../../services/QuanLyDatVeServices";

export default function ShowTime(props) {
	const formik = useFormik({
		initialValues: {
			maPhim: props.match.params.id,
			ngayChieuGioChieu: "",
			maRap: "",
			giaVe: "",
		},
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
		<Form
			onSubmitCapture={formik.handleSubmit}
			labelCol={{
				span: 4,
			}}
			wrapperCol={{
				span: 10,
			}}
			layout="horizontal"
			size="large">
			<h3>Tạo lịch chiếu</h3>
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
			</Form.Item>
			<Form.Item label="Ngày chiếu, giờ chiếu">
				<DatePicker format="DD/MM/YYYY hh:mm:ss" showTime onOk={onChangeDate} />
			</Form.Item>
			<Form.Item label="Giá vé">
				<InputNumber min={1} max={150000} onChange={handleChangeValue("giaVe")} />
			</Form.Item>
			<Form.Item>
				<Button htmlType="submit">Tạo lịch chiếu</Button>
			</Form.Item>
		</Form>
	);
}
