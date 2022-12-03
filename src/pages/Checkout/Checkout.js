import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { datVeAction, layChiTietPhongVeAction } from "../../redux/actions/QuanLyDatVeAction";
import style from "./Checkout.module.css";
import "./Checkout.css";
import { CloseOutlined, UserOutlined, SmileOutlined, LogoutOutlined, HomeOutlined } from "@ant-design/icons";
import { CHUYEN_TAB, DAT_VE } from "../../redux/types/QuanLyDatVeType";
import _ from "lodash";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { Tabs } from "antd";
import { layThongTinNguoiDungAction } from "../../redux/actions/QuanLyNguoiDungAction";
import moment from "moment";
import { history } from "../../App";
import { TOKEN, USER_LOGIN } from "../../utils/settings/config";
import { NavLink } from "react-router-dom";

export default function CheckoutTab(props) {
	const { tabActive } = useSelector((state) => state.QuanLyDatVeReducer);
	const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch({ type: CHUYEN_TAB, number: 1 });
	}, []);
	const operations = (
		<Fragment>
			{_.isEmpty(userLogin) ? (
				""
			) : (
				<div className="flex items-center">
					<button
						className="mx-5 flex items-center text-lg"
						onClick={() => {
							history.push("/profile");
						}}>
						<span className="mr-3 w-9 h-9 rounded-full bg-blue-400 flex items-center justify-center">
							{userLogin.taiKhoan.substr(0, 1).toUpperCase()}
						</span>{" "}
						Xin chào, {userLogin.taiKhoan}
					</button>
					<button
						className="flex items-center"
						onClick={() => {
							localStorage.removeItem(USER_LOGIN);
							localStorage.removeItem(TOKEN);
							history.push("/home");
							window.location.reload();
						}}>
						Đăng xuất
						<LogoutOutlined style={{ fontSize: 20, marginLeft: 5, marginRight: 10 }} />
					</button>
				</div>
			)}
		</Fragment>
	);
	return (
		<div className="tabDatVe min-h-screen">
			<Tabs
				tabBarExtraContent={operations}
				activeKey={tabActive}
				onChange={(key) => {
					dispatch({ type: CHUYEN_TAB, number: key });
				}}
				items={[
					{
						label: (
							<NavLink style={{ color: "black", marginLeft: 12 }} to="/home">
								<HomeOutlined style={{ fontSize: 30 }} />
								Trang chủ
							</NavLink>
						),
						key: 3,
					},
					{
						label: `01. CHỌN GHẾ & THANH TOÁN`,
						key: 1,
						children: <Checkout {...props} />,
					},
					{
						label: `02. KẾT QUẢ ĐẶT VÉ`,
						key: 2,
						children: <KetQuaDatVe {...props} />,
					},
				]}
			/>
		</div>
	);
}

function Checkout(props) {
	const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
	const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } = useSelector((state) => state.QuanLyDatVeReducer);
	const { thongTinPhim, danhSachGhe } = chiTietPhongVe;

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(layChiTietPhongVeAction(props.match.params.id));
	}, []);
	let classDatVe = danhSachGheDangDat.length === 0 ? "disabledDatVe" : "datVe";
	const renderGhe = () => {
		return danhSachGhe.map((ghe, index) => {
			let classGheVIP = ghe.loaiGhe === "Vip" ? "gheVIP" : "";
			let classGheDaDat = ghe.daDat ? "gheDaDat " : "";
			let classGheDangDat = "";
			let indexGheDD = danhSachGheDangDat.findIndex((gheDD) => gheDD.maGhe === ghe.maGhe);
			let classGheBanDat = "";

			let classGheKhachDat = "";
			let indexGheKD = danhSachGheKhachDat.findIndex((gheKD) => gheKD.maGhe === ghe.maGhe);
			if (indexGheKD !== -1) {
				classGheKhachDat = "gheKhachDat";
			}

			if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
				classGheBanDat = "gheBanDat";
			}
			if (indexGheDD !== -1) {
				classGheDangDat = "gheDangDat";
			}

			return (
				<Fragment key={index}>
					<button
						onClick={() => {
							dispatch({ type: DAT_VE, gheDuocChon: ghe });
						}}
						disabled={ghe.daDat || classGheKhachDat !== ""}
						className={`ghe ${classGheVIP} ${classGheDaDat} ${classGheDangDat} ${classGheBanDat} ${classGheKhachDat} `}>
						{ghe.daDat ? (
							classGheBanDat !== "" ? (
								<UserOutlined style={{ fontSize: 20 }} />
							) : (
								<CloseOutlined style={{ fontSize: 30 }} />
							)
						) : classGheKhachDat !== "" ? (
							<SmileOutlined />
						) : (
							ghe.stt
						)}
					</button>
					{(index + 1) % 16 === 0 ? <br /> : ""}
				</Fragment>
			);
		});
	};

	return (
		<div className="grid grid-cols-12 ">
			<div className="col-span-9 mt-5">
				<div className="flex flex-col items-center">
					<div className="bg-black w-4/5 p-3"></div>
					<div className={`${style["trapezoid"]} text-center`}>
						<h2 className="text-black mt-3 text-lg">Màn hình</h2>
					</div>
					<div className="mt-10">{renderGhe()}</div>
				</div>
				<div className="grid grid-cols-4 mt-5">
					<div className="col-span-2 col-start-2 flex justify-around text-center">
						<div>
							<button className="ghe"></button>
							<p>Ghế mặc định</p>
						</div>
						<div>
							<button className="ghe gheDaDat">
								<CloseOutlined style={{ fontSize: 30 }} />
							</button>
							<p>Ghế đã đặt</p>
						</div>
						<div>
							<button className="ghe gheDangDat"></button>
							<p>Ghế đang chọn</p>
						</div>
						<div>
							<button className="ghe gheVIP"></button>
							<p>Ghế VIP</p>
						</div>
						<div>
							<button className="ghe gheBanDat">
								<UserOutlined style={{ fontSize: 20 }} />
							</button>
							<p>Ghế bạn đã đặt</p>
						</div>
					</div>
				</div>
			</div>
			<div className="thongTinDatVe col-span-3 flex flex-col justify-between  ">
				<div className=" p-10">
					<h3 className="text-center text-4xl text-green-600 font-semibold">
						{danhSachGheDangDat
							.reduce((tongTien, ghe, index) => {
								return (tongTien += ghe.giaVe);
							}, 0)
							.toLocaleString()}{" "}
						đ
					</h3>
					<hr />
					<h3 className="text-xl">{thongTinPhim?.tenPhim}</h3>
					<p>
						Địa điểm: {thongTinPhim.tenCumRap} - {thongTinPhim.tenRap}
					</p>
					<p>
						Ngày chiếu: {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}
					</p>
					<hr />
					<div className=" my-5 text-lg font-medium">
						<span className="text-red-500">Ghế:</span>
						{_.sortBy(danhSachGheDangDat, ["stt"]).map((ghe, index) => {
							return (
								<span key={index} className="text-green-600 ml-2 text-xl inline-block">
									{ghe.stt}
								</span>
							);
						})}
					</div>
					<hr />
					<div className="my-5">
						<i>Email</i>
						<p className="text-lg">{userLogin.email}</p>
					</div>
					<hr />
					<div className="my-5">
						<i>Phone</i>
						<p className="text-lg">{userLogin.soDT}</p>
					</div>
					<hr />
				</div>
				<div
					onClick={() => {
						const thongTinDatVe = new ThongTinDatVe();
						thongTinDatVe.maLichChieu = props.match.params.id;
						thongTinDatVe.danhSachVe = danhSachGheDangDat;
						dispatch(datVeAction(thongTinDatVe));
					}}
					className={`${classDatVe} w-full justify-self-end text-center text-xl text-white py-4 font-bold`}>
					ĐẶT VÉ
				</div>
			</div>
		</div>
	);
}

function KetQuaDatVe(props) {
	const { thongTinNguoiDung } = useSelector((state) => state.QuanLyNguoiDungReducer);
	const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(layThongTinNguoiDungAction());
	}, []);

	const renderTicketItem = () => {
		return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
			const firstSeat = _.first(ticket.danhSachGhe);
			return (
				<div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full">
					<div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
						<img
							alt="team"
							className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
							src={ticket.hinhAnh}
						/>
						<div className="flex-grow">
							<h2 className="text-red-600 text-2xl font-bold">{ticket.tenPhim}</h2>
							<p className="text-gray-500">Thời lượng phim: {ticket.thoiLuongPhim} phút</p>
							<p className="text-gray-500">
								Thời gian:{" "}
								<span className="text-xl font-bold">
									{moment(ticket.ngayDat).format("hh:mm A - DD/MM/yyyy")}
								</span>
							</p>

							<p className="text-gray-500">
								Địa điểm: <span className="text-xl font-bold">{firstSeat.tenHeThongRap}</span>
							</p>
							<p className="text-gray-500">
								Tên rạp: <span className="text-xl font-bold">{firstSeat.tenCumRap}</span>
							</p>
							<p>
								Ghế:{" "}
								{ticket.danhSachGhe.map((ghe, index) => {
									return (
										<span className="ml-2 inline-block text-2xl font-bold text-green-600" key={index}>
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
				<div className="container px-5 py-24 mx-auto">
					<div className="flex flex-col text-center w-full mb-20">
						<h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-purple-600">
							Lịch sử đặt vé khách hàng
						</h1>
						<p className="lg:w-2/3 mx-auto leading-relaxed text-base">
							Kiểm tra thông tin về vé, chổ ngồi, giá trước khi thanh toán !!!
						</p>
					</div>
					<div className="flex flex-wrap -m-2">{renderTicketItem()}</div>
				</div>
			</section>
		</div>
	);
}
