import { Button, Form, Input } from "antd";
import { useFormik } from "formik";
import _ from "lodash";
import moment from "moment";
import React from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	capNhatThongTinNguoiDungDangNhapAction,
	layThongTinNguoiDungAction,
} from "../../redux/actions/QuanLyNguoiDungAction";
import { GROUPID } from "../../utils/settings/config";
import { validationUserInfo } from "../../_core/schemas/validation";

export default function Profile(props) {
	const dispatch = useDispatch();
	const { thongTinNguoiDung } = useSelector((state) => state.QuanLyNguoiDungReducer);
	useEffect(() => {
		dispatch(layThongTinNguoiDungAction());
	}, []);
	return (
		<div
			className="container mx-auto min-h-screen  grid grid-cols-4"
			style={{ backgroundColor: "rgb(245, 245, 242)" }}>
			<div className="p-5 bg-slate-300">
				<ThongTinTaiKhoan thongTinNguoiDung={thongTinNguoiDung} {...props} />
			</div>
			<div className="col-span-3">
				<KetQuaDatVe thongTinNguoiDung={thongTinNguoiDung} {...props} />
			</div>
		</div>
	);
}

function ThongTinTaiKhoan(props) {
	const dispatch = useDispatch();
	const { thongTinNguoiDung } = props;
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			taiKhoan: thongTinNguoiDung.taiKhoan,
			matKhau: thongTinNguoiDung.matKhau,
			matKhauNhapLai: "",
			email: thongTinNguoiDung.email,
			soDT: thongTinNguoiDung.soDT,
			maNhom: GROUPID,
			maLoaiNguoiDung: thongTinNguoiDung.maLoaiNguoiDung === "Quản trị" ? "QuanTri" : "KhachHang",
			hoTen: thongTinNguoiDung.hoTen,
		},
		validationSchema: validationUserInfo,
		onSubmit: (values) => {
			dispatch(capNhatThongTinNguoiDungDangNhapAction(values));
		},
	});

	return (
		<Fragment>
			<p className="text-center mt-5 text-xl font-semibold">THÔNG TIN TÀI KHOẢN</p>
			<Form onSubmitCapture={formik.handleSubmit} layout="vertical" labelCol={{ span: 8 }} size="large">
				<Form.Item label="Tài Khoản">
					<Input disabled name="taiKhoan" onChange={formik.handleChange} value={formik.values.taiKhoan} />
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
						name="soDT"
						value={formik.values.soDT}
						onChange={formik.handleChange}
						style={formik.errors.soDT ? { borderColor: "red" } : {}}
					/>
					{formik.errors.soDT && <p className="text-red-600">{formik.errors.soDT}</p>}
				</Form.Item>
				<Button htmlType="submit" type="primary">
					Cập nhật
				</Button>
			</Form>
		</Fragment>
	);
}

function KetQuaDatVe(props) {
	const { thongTinNguoiDung } = props;
	const renderTicketItem = () => {
		return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
			const firstSeat = _.first(ticket.danhSachGhe);
			return (
				<div key={index} className="p-2 w-1/3 ">
					<div className="h-full border-gray-200 border p-4 rounded-lg bg-white shadow-md">
						<div className="flex items-center mb-3">
							<img
								alt="team"
								className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
								src={ticket.hinhAnh}
							/>
							<h2 className="text-red-600 text-xl font-bold">{ticket.tenPhim}</h2>
						</div>
						<div>
							<p className="text-gray-500 mb-2">
								Thời lượng phim: <span className="font-bold">{ticket.thoiLuongPhim} phút</span>
							</p>
							<p className="text-gray-500 mb-2">
								Thời gian:{" "}
								<span className="text-base font-bold">
									{moment(ticket.ngayDat).format("hh:mm A - DD/MM/yyyy")}
								</span>
							</p>
							<p className="text-gray-500 mb-2">
								Địa điểm: <span className="text-base font-bold">{firstSeat.tenHeThongRap}</span>
							</p>
							<p className="text-gray-500 mb-2">
								Tên rạp: <span className="text-base font-bold">{firstSeat.tenCumRap}</span>
							</p>
							<p className="m-0">
								Ghế:
								{ticket.danhSachGhe.map((ghe, index) => {
									return (
										<span className="ml-2 inline-block text-base font-bold text-green-600" key={index}>
											[{ghe.tenGhe}]
										</span>
									);
								})}
							</p>
						</div>
					</div>
				</div>
			);
		});
	};

	return (
		<div className="p-5">
			<section className="text-gray-600 body-font">
				<div className="container mx-auto">
					<div className="flex flex-col text-center w-full ">
						<h1 className="sm:text-3xl text-2xl font-medium title-font mb- text-purple-600">
							Lịch sử đặt vé khách hàng
						</h1>
						<p className="lg:w-2/3 mx-auto leading-relaxed text-base">
							Cảm ơn bạn đã sử dụng website của chúng tôi. Chúc bạn có trải nghiệm xem phim thoải mái !!!
						</p>
					</div>
					<div className="flex flex-wrap -m-2">{renderTicketItem()}</div>
				</div>
			</section>
		</div>
	);
}
