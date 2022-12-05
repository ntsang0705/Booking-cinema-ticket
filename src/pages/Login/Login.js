import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { DoubleRightOutlined } from "@ant-design/icons";
import { useSpring, animated } from "react-spring";
import { dangKyAction, dangNhapAction } from "../../redux/actions/QuanLyNguoiDungAction";
import bgImg from "../../assets/images/backgroundLogin.jpg";
import { GROUPID } from "../../utils/settings/config";
import { validationUserInfo } from "../../_core/schemas/validation";
import { Button } from "antd";

export default function Login(props) {
	const [registerClick, setRegisterClick] = useState(false);
	const dispatch = useDispatch();

	const RenderImg = () => {
		const locateX = window.innerWidth / 2;
		const imgAnimation = useSpring({
			translateX: registerClick ? locateX : 0,
			from: { translateX: 0 },
			delay: 100,
			config: { duration: 500 },
		});
		return (
			<animated.div style={imgAnimation} className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0 absolute left-0">
				<img src={bgImg} className="min-h-screen w-full" alt="" />
			</animated.div>
		);
	};

	const formikLogin = useFormik({
		initialValues: {
			taiKhoan: "",
			matKhau: "",
		},

		onSubmit: (values) => {
			dispatch(dangNhapAction(values));
		},
	});

	const formikRegister = useFormik({
		initialValues: {
			taiKhoan: "",
			matKhau: "",
			email: "",
			soDt: "",
			maNhom: GROUPID,
			hoTen: "",
		},
		validationSchema: validationUserInfo,
		onSubmit: (values) => {
			dispatch(dangKyAction(values));
		},
	});

	return (
		<div
			className="flex justify-center items-center flex-wrap min-h-screen g-6 text-gray-800 relative"
			style={{ backgroundColor: "rgb(245, 245, 242)" }}>
			<div className="w-1/2 min-h-screen flex flex-col justify-center">
				<form onSubmit={formikRegister.handleSubmit}>
					<div
						className="w-1/2 mx-auto border-2 bg-gray-200 p-5 rounded-lg"
						style={{ boxShadow: "2px 4px 10px 1px rgba(201,201,201,0.47)" }}>
						<div className="mb-6">
							<div
								onClick={() => {
									setRegisterClick(false);
								}}
								className="form-group  w-full text-right text-base font-semibold text-blue-600 hover:text-blue-900 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out flex justify-end items-center cursor-pointer">
								Quay lại <DoubleRightOutlined />
							</div>
						</div>
						<div className="mb-6">
							<input
								onChange={formikRegister.handleChange}
								name="hoTen"
								className="form-control block w-full px-4 py-2 text-base  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								placeholder="Họ tên"
								style={formikRegister.errors.hoTen ? { borderColor: "red" } : {}}
							/>
							{formikRegister.errors.hoTen && <p className="text-red-600">{formikRegister.errors.hoTen}</p>}
						</div>
						<div className="mb-6">
							<input
								onChange={formikRegister.handleChange}
								name="taiKhoan"
								type="text"
								className="form-control block w-full px-4 py-2 text-base  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								placeholder="Tài khoản"
								style={formikRegister.errors.taiKhoan ? { borderColor: "red" } : {}}
							/>
							{formikRegister.errors.taiKhoan && (
								<p className="text-red-600">{formikRegister.errors.taiKhoan}</p>
							)}
						</div>
						<div className="mb-6">
							<input
								onChange={formikRegister.handleChange}
								name="matKhau"
								type="password"
								className="form-control block w-full px-4 py-2 text-base  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								placeholder="Mật khẩu"
								style={formikRegister.errors.matKhau ? { borderColor: "red" } : {}}
							/>
							{formikRegister.errors.matKhau && <p className="text-red-600">{formikRegister.errors.matKhau}</p>}
						</div>
						<div className="mb-6">
							<input
								onChange={formikRegister.handleChange}
								type="password"
								name="matKhauNhapLai"
								className="form-control block w-full  px-4 py-2 text-base  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								placeholder="Nhập lại mật khẩu"
								style={formikRegister.errors.matKhauNhapLai ? { borderColor: "red" } : {}}
							/>
							{formikRegister.errors.matKhauNhapLai && (
								<p className="text-red-600">{formikRegister.errors.matKhauNhapLai}</p>
							)}
						</div>
						<div className="mb-6">
							<input
								onChange={formikRegister.handleChange}
								name="email"
								className="form-control block w-full  px-4 py-2 text-base  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								placeholder="Email"
								style={formikRegister.errors.email ? { borderColor: "red" } : {}}
							/>
							{formikRegister.errors.email && <p className="text-red-600">{formikRegister.errors.email}</p>}
						</div>
						<div className="mb-6">
							<input
								onChange={formikRegister.handleChange}
								name="soDt"
								type="number"
								className="form-control block w-full  px-4 py-2 text-base  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								placeholder="Số điện thoại"
								style={formikRegister.errors.soDt ? { borderColor: "red" } : {}}
							/>
							{formikRegister.errors.soDt && <p className="text-red-600">{formikRegister.errors.soDt}</p>}
						</div>
						<div>
							<Button
								disabled={!formikRegister.isValid}
								type="primary"
								size="large"
								style={{ width: "100%", borderRadius: 5, fontWeight: "bold", fontSize: 17 }}
								data-mdb-ripple="true"
								data-mdb-ripple-color="light"
								onClick={() => {
									setRegisterClick(false);
								}}>
								Đăng kí
							</Button>
						</div>
					</div>
				</form>
			</div>
			{RenderImg()}
			<div className="w-1/2 min-h-screen flex flex-col justify-center">
				<form onSubmit={formikLogin.handleSubmit}>
					<div
						className="w-1/2 mx-auto border-2 bg-gray-200 p-5 rounded-lg"
						style={{ boxShadow: "2px 4px 10px 1px rgba(201,201,201,0.47)" }}>
						<div className="mb-6 ">
							<input
								onChange={formikLogin.handleChange}
								name="taiKhoan"
								type="text"
								className="form-control block w-full  px-4 py-2 text-lg  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								placeholder="Tài khoản"
							/>
						</div>
						{/* Password input */}
						<div className="mb-6">
							<input
								onChange={formikLogin.handleChange}
								name="matKhau"
								type="password"
								className="form-control block w-full  px-4 py-2 text-lg  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								placeholder="Mật khẩu"
							/>
						</div>
						<div className="flex justify-between items-center mb-6">
							<div className="form-group form-check w-full mx-auto">
								<label className="form-check-label inline-block text-gray-800 text-base">
									Bạn chưa có tài khoàn?{" "}
									<div
										onClick={() => {
											setRegisterClick(true);
										}}
										className="font-semibold inline text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out cursor-pointer">
										Đăng kí
									</div>
								</label>
							</div>
						</div>
						{/* Submit button */}
						<button
							type="submit"
							className="form-group block w-full mx-auto  px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
							data-mdb-ripple="true"
							data-mdb-ripple-color="light">
							Đăng nhập
						</button>
					</div>
					{/* Email input */}
				</form>
			</div>
		</div>
	);
}
