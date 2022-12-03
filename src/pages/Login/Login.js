import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { DoubleRightOutlined } from "@ant-design/icons";
import { useSpring, animated } from "react-spring";
import { dangKyAction, dangNhapAction } from "../../redux/actions/QuanLyNguoiDungAction";
import bgImg from "../../assets/images/backgroundLogin.jpg";
import { GROUPID } from "../../utils/settings/config";

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

		onSubmit: (values) => {
			dispatch(dangKyAction(values));
		},
	});

	return (
		<div className=" min-h-screen ">
			<div className="flex justify-center items-center flex-wrap min-h-screen g-6 text-gray-800 relative">
				<div className="md:w-8/12 lg:w-6/12 md:mb-0">
					<form onSubmit={formikRegister.handleSubmit}>
						<div className="mb-6">
							<div
								onClick={() => {
									setRegisterClick(false);
								}}
								className="form-group  w-2/3 mx-auto text-right text-base font-semibold text-blue-600 hover:text-blue-900 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out flex justify-end items-center cursor-pointer">
								Quay lại <DoubleRightOutlined />
							</div>
						</div>
						<div className="mb-6">
							<input
								onChange={formikRegister.handleChange}
								name="hoTen"
								className="form-control block w-2/3 mx-auto px-4 py-2 text-base  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								placeholder="Họ tên"
							/>
						</div>
						<div className="mb-6">
							<input
								onChange={formikRegister.handleChange}
								name="taiKhoan"
								type="text"
								className="form-control block w-2/3 mx-auto px-4 py-2 text-base  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								placeholder="Tài khoản"
							/>
						</div>
						<div className="mb-6">
							<input
								onChange={formikRegister.handleChange}
								name="matKhau"
								type="password"
								className="form-control block w-2/3 mx-auto px-4 py-2 text-base  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								placeholder="Mật khẩu"
							/>
						</div>
						<div className="mb-6">
							<input
								onChange={formikRegister.handleChange}
								type="password"
								className="form-control block w-2/3 mx-auto px-4 py-2 text-base  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								placeholder="Nhập lại mật khẩu"
							/>
						</div>
						<div className="mb-6">
							<input
								onChange={formikRegister.handleChange}
								name="email"
								className="form-control block w-2/3 mx-auto px-4 py-2 text-base  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								placeholder="Email"
							/>
						</div>
						<div className="mb-6">
							<input
								onChange={formikRegister.handleChange}
								name="soDt"
								type="number"
								className="form-control block w-2/3 mx-auto px-4 py-2 text-base  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								placeholder="Số điện thoại"
							/>
						</div>
						<div>
							<button
								type="submit"
								className="form-control block mx-auto w-2/3 px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
								data-mdb-ripple="true"
								data-mdb-ripple-color="light"
								onClick={() => {
									setRegisterClick(false);
								}}>
								Đăng kí
							</button>
						</div>
					</form>
				</div>
				{RenderImg()}
				<div className="md:w-8/12 lg:w-5/12 lg:ml-20">
					<form onSubmit={formikLogin.handleSubmit}>
						{/* Email input */}
						<div className="mb-6">
							<input
								onChange={formikLogin.handleChange}
								name="taiKhoan"
								type="text"
								className="form-control block w-full px-4 py-2 text-lg  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								placeholder="Tài khoản"
							/>
						</div>
						{/* Password input */}
						<div className="mb-6">
							<input
								onChange={formikLogin.handleChange}
								name="matKhau"
								type="password"
								className="form-control block w-full px-4 py-2 text-lg  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								placeholder="Mật khẩu"
							/>
						</div>
						<div className="flex justify-between items-center mb-6">
							<div className="form-group form-check">
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
							className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
							data-mdb-ripple="true"
							data-mdb-ripple-color="light">
							Đăng nhập
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
