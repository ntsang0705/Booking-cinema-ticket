import { Tabs } from "antd";
import moment from "moment";
import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

export default function HomeMenu(props) {
	return (
		<Tabs
			style={{ backgroundColor: "rgb(245, 245, 242)" }}
			tabPosition="left"
			items={props.heThongRapChieu.map((rapChieu, index) => {
				return {
					label: <img src={rapChieu.logo} alt="" className="rounded-full" width="50" />,
					key: index,
					children: (
						<Tabs
							tabPosition="left"
							items={rapChieu.lstCumRap.map((cumRap, index) => {
								return {
									label: (
										<div className="flex items-center" key={index}>
											<img src={rapChieu.logo} alt="" width="50" />
											<div className="ml-2 text-left ">
												<p className="text-lg font-medium mb-1">{cumRap.tenCumRap}</p>
												<p className="m-0 italic">{cumRap.diaChi}</p>
											</div>
										</div>
									),
									key: index,
									children: cumRap.danhSachPhim.map((phim, index) => {
										return (
											<Fragment key={index}>
												<div className="my-5">
													<div className="flex">
														<img
															style={{ width: 100, height: "100%" }}
															src={phim.hinhAnh}
															alt={phim.tenPhim}
														/>
														<div className="ml-3">
															<p className="text-2xl text-green-300 font-medium">{phim.tenPhim}</p>
															<div className="grid grid-cols-8 gap-4">
																{phim.lstLichChieuTheoPhim?.map((lichChieu, index) => {
																	return (
																		<NavLink
																			to={`/checkout/${lichChieu.maLichChieu}`}
																			key={index}
																			className="font-medium text-base">
																			{moment(lichChieu.ngayChieuGioChieu).format("hh:mm A")}
																		</NavLink>
																	);
																})}
															</div>
														</div>
													</div>
												</div>
												<hr />
											</Fragment>
										);
									}),
								};
							})}
						/>
					),
				};
			})}
		/>
	);
}
