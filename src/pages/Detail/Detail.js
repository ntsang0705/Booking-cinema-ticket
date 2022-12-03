import React, { useEffect } from "react";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import { Rate, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { layThongTinChiTietPhimAction } from "../../redux/actions/QuanLyRapAction";
import moment from "moment";
import "./CirclePercent.css";
import "./tabStyle.css";
import { NavLink } from "react-router-dom";

export default function Detail(props) {
	const { filmDetail } = useSelector((state) => state.QuanLyRapReducer);

	const dispatch = useDispatch();
	useEffect(() => {
		let { id } = props.match.params;
		dispatch(layThongTinChiTietPhimAction(id));
	}, []);

	return (
		<div
			style={{
				backgroundImage: `url(${filmDetail.hinhAnh})`,
				backgroundPosition: "center",
				backgroundSize: "cover",
				minHeight: "100vh",
			}}>
			<CustomCard
				style={{ minHeight: "100vh", paddingTop: 150 }}
				effectColor="#C780FF" // required
				color="#14AEFF" // default color is white
				blur={20} // default blur value is 10px
				borderRadius="none" // default border radius value is 10px
			>
				<div className="grid grid-cols-12">
					<div className="col-span-5 col-start-3">
						<div className="grid grid-cols-3">
							<img className="col-span-1" src={filmDetail.hinhAnh} style={{ height: 300 }} alt="" />
							<div className="col-span-2 ml-5 text-white my-auto">
								<p>Ngày chiếu: {moment(filmDetail.ngayKhoiChieu).format("DD.MM.yyyy")}</p>
								<p className="text-4xl ">{filmDetail.tenPhim}</p>
								<p>{filmDetail.moTa}</p>
							</div>
						</div>
					</div>
					<div className="col-span-4 flex flex-col items-center my-auto">
						<div className={`c100 p${filmDetail.danhGia * 10} green`}>
							<span className="">{filmDetail.danhGia * 10}%</span>
							<div className="slice">
								<div className="bar" />
								<div className="fill" />
							</div>
						</div>
						<Rate disabled allowHalf value={filmDetail.danhGia / 2} />
					</div>
				</div>
				<div className=" tabThongTin mt-10 w-2/3 mx-auto">
					<Tabs
						defaultActiveKey="1"
						items={[
							{
								label: `Lịch Chiếu`,
								key: "1",
								children: (
									<Tabs
										style={{ color: "#fff" }}
										tabPosition="left"
										items={filmDetail.heThongRapChieu?.map((htr, index) => {
											return {
												label: (
													<div className="text-lg flex flex-row items-center">
														<img width={50} height={50} src={htr.logo} alt="" />
														<div className="ml-3">{htr.tenHeThongRap}</div>
													</div>
												),
												key: index,
												children: htr.cumRapChieu?.map((cumRap, index) => {
													return (
														<div key={index} className="mt-5">
															<div className="flex flex-row items-center mb-3">
																<img src={cumRap.hinhAnh} alt="" width={50} height={50} />
																<div className="ml-3 ">
																	<p className="text-xl font-medium mb-2">{cumRap.tenCumRap}</p>
																	<p className="m-0  italic ">{cumRap.diaChi}</p>
																</div>
															</div>
															<div className="grid grid-cols-8 gap-4">
																{cumRap.lichChieuPhim?.map((lichChieu, index) => {
																	return (
																		<NavLink
																			to={`/checkout/${lichChieu.maLichChieu}`}
																			key={index}
																			className="text-green-300 font-semibold text-base ">
																			{moment(lichChieu.ngayChieuGioChieu).format("mm:hh A")}
																		</NavLink>
																	);
																})}
															</div>
														</div>
													);
												}),
											};
										})}
									/>
								),
							},
							{
								label: `Thông tin`,
								key: "2",
								children: `Content of Tab Pane 2`,
							},
							{
								label: `Đánh giá`,
								key: "3",
								children: `Content of Tab Pane 3`,
							},
						]}
					/>
				</div>
			</CustomCard>
		</div>
	);
}
