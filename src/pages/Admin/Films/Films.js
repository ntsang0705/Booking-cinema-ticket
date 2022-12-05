import React, { useEffect } from "react";
import { Button, Input, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { layDSPhimAction, xoaPhimAction } from "../../../redux/actions/QuanLyPhimAction";
import { NavLink } from "react-router-dom";
import { EditOutlined, DeleteOutlined, CalendarOutlined } from "@ant-design/icons";
import { history } from "../../../App";

export default function Films() {
	const { arrFilmDefault } = useSelector((state) => state.QuanLyPhimReducer);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(layDSPhimAction(""));
	}, []);
	const { Search } = Input;

	const onSearch = (value) => {
		dispatch(layDSPhimAction(value));
	};
	const columns = [
		{
			title: "Mã Phim",
			dataIndex: "maPhim",
			width: "8%",
			sorter: (a, b) => a.maPhim - b.maPhim,
			sortDireactions: ["descend"],
		},
		{
			title: "Hình Ảnh",
			dataIndex: "hinhAnh",
			width: "8%",
			render: (text, film, index) => {
				return (
					<img
						key={index}
						src={film.hinhAnh}
						alt={film.tenPhim}
						width={50}
						height={50}
						onError={(e) => {
							e.target.onError = null;
							e.target.src = `https://picsum.photos/id/${index}/50/50`;
						}}
					/>
				);
			},
		},
		{
			title: "Tên Phim",
			dataIndex: "tenPhim",
			width: "25%",
			sorter: (a, b) => {
				let tenPhimA = a.tenPhim.toLowerCase().trim();
				let tenPhimB = a.tenPhim.toLowerCase().trim();
				if (tenPhimA > tenPhimB) {
					return 1;
				}
				return -1;
			},
			sortDireactions: ["descend", "ascend"],
		},
		{
			title: "Mô tả",
			dataIndex: "moTa",
			render: (text, film) => {
				return film.moTa.length > 100 ? film.moTa.substr(0, 100) + " ..." : film.moTa;
			},
			sortDireactions: ["descend", "ascend"],
		},
		{
			width: "11%",
			render: (text, film) => {
				return (
					<div className="text-center">
						<NavLink to={`/admin/films/edit/${film.maPhim}`} className=" text-blue-800">
							<EditOutlined className="text-2xl" />
						</NavLink>
						<span
							className="text-red-700 text-2xl cursor-pointer mx-5"
							onClick={() => {
								if (window.confirm("Bạn có chắc muốn xóa phim: " + film.tenPhim)) {
									dispatch(xoaPhimAction(film.maPhim));
								}
							}}>
							<DeleteOutlined />
						</span>
						<NavLink to={`/admin/films/showtime/${film.maPhim}`} className="mr-5 text-blue-800">
							<CalendarOutlined className="text-2xl" />
						</NavLink>
					</div>
				);
			},
		},
	];
	const data = arrFilmDefault;

	return (
		<div>
			<h3 className="text-3xl">Quản lý phim</h3>
			<Button
				type="primary"
				size="large"
				onClick={() => {
					history.push("/admin/films/addfilm");
				}}>
				Thêm phim
			</Button>
			<Search className="my-5" placeholder="Tìm kiếm" allowClear enterButton size="large" onSearch={onSearch} />
			<Table rowKey={(data) => data.maPhim} columns={columns} dataSource={data} />
		</div>
	);
}
