import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { TeamOutlined, VideoCameraOutlined, PlaySquareOutlined } from "@ant-design/icons";
import style from "./Dashboard.module.css";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { layDanhSachNguoiDungAction } from "../../../redux/actions/QuanLyNguoiDungAction";
import { layDSPhimAction } from "../../../redux/actions/QuanLyPhimAction";
import { layDSHeThongRapAction } from "../../../redux/actions/QuanLyRapAction";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
	const labels = ["January", "February", "March", "April", "May", "June", "July"];
	const data = {
		labels,
		datasets: [
			{
				label: "Dataset 1",
				data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
				borderColor: "rgb(255, 99, 132)",
				backgroundColor: "rgba(255, 99, 132, 0.5)",
			},
		],
	};

	const dispatch = useDispatch();
	const { users } = useSelector((state) => state.QuanLyNguoiDungReducer);
	const { arrFilm } = useSelector((state) => state.QuanLyPhimReducer);
	const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);
	useEffect(() => {
		dispatch(layDanhSachNguoiDungAction(""));
		dispatch(layDSPhimAction(""));
		dispatch(layDSHeThongRapAction());
	}, []);

	return (
		<div>
			<div className="flex justify-around">
				<div className={`${style["card"]}`}>
					<TeamOutlined style={{ fontSize: 50, color: "rgb(75,85,99)" }} />
					<div className="text-center">
						<p className="text-4xl mb-0 font-bold text-gray-600 tracking-wide">{users.length.toLocaleString()}</p>
						<p className="my-2 font-semibold text-gray-500 ">Total Users</p>
						<NavLink to="/admin/users">See all users</NavLink>
					</div>
				</div>
				<div className={`${style["card"]}`}>
					<PlaySquareOutlined style={{ fontSize: 50, color: "rgb(75,85,99)" }} />
					<div className="text-center">
						<p className="text-4xl mb-0 font-bold text-gray-600 tracking-wide">
							{arrFilm.length.toLocaleString()}
						</p>
						<p className="my-2 font-semibold text-gray-500 ">Total Films</p>
						<NavLink to="/admin/films">See all films</NavLink>
					</div>
				</div>
				<div className={`${style["card"]}`}>
					<VideoCameraOutlined style={{ fontSize: 50, color: "rgb(75,85,99)" }} />
					<div className="text-center">
						<p className="text-4xl mb-0 font-bold text-gray-600 tracking-wide">
							{heThongRapChieu.reduce((total, rapChieu) => {
								return (total += rapChieu.lstCumRap.length);
							}, 0)}
						</p>
						<p className="my-2 font-semibold text-gray-500 ">Total Cinema</p>
					</div>
				</div>
			</div>
			<h3 className="mt-7 text-center text-2xl">Thống kê</h3>
			<div style={{ height: 500, width: "100%" }}>
				<Line options={{ responsive: true, maintainAspectRatio: false }} data={data} />
			</div>
		</div>
	);
}
