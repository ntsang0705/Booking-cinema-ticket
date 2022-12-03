import React, { useEffect } from "react";
import { Button, Input, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { history } from "../../../App";
import { layDanhSachNguoiDungAction, xoaNguoiDungAction } from "../../../redux/actions/QuanLyNguoiDungAction";

export default function Users() {
	const { users } = useSelector((state) => state.QuanLyNguoiDungReducer);
	const dispatch = useDispatch();
	const { Search } = Input;

	useEffect(() => {
		dispatch(layDanhSachNguoiDungAction(""));
	}, []);

	const onSearch = (value) => {
		dispatch(layDanhSachNguoiDungAction(value));
	};
	const columns = [
		{
			title: "Tài khoản",
			dataIndex: "taiKhoan",
			width: "15%",
		},
		{
			title: "Mật khẩu",
			dataIndex: "matKhau",
			width: "15%",
		},
		{
			title: "Họ tên",
			dataIndex: "hoTen",
			width: "17%",
		},
		{
			title: "Email",
			dataIndex: "email",
			width: "20%",
		},
		{
			title: "Số điện thoại",
			dataIndex: "soDt",
			width: "10%",
		},
		{
			title: "Loại người dùng",
			dataIndex: "maLoaiNguoiDung",
			width: "10%",
		},
		{
			title: "Thao tác",
			width: "8%",
			render: (text, user) => {
				return (
					<div className="text-center">
						<NavLink to={`/admin/users/edit/${user.taiKhoan}`} className=" text-blue-800">
							<EditOutlined className="text-2xl" />
						</NavLink>
						<span
							className="text-red-700 text-2xl cursor-pointer mx-5"
							onClick={() => {
								if (window.confirm("Bạn có chắc muốn xóa tài khoản: " + user.taiKhoan)) {
									dispatch(xoaNguoiDungAction(user.taiKhoan));
								}
							}}>
							<DeleteOutlined />
						</span>
					</div>
				);
			},
		},
	];
	const data = users;

	return (
		<div>
			<h3 className="text-3xl">Quản lý người dùng</h3>

			<Button
				type="primary"
				size="large"
				onClick={() => {
					history.push("/admin/users/adduser");
				}}>
				Thêm người dùng
			</Button>

			<Search className="my-5" placeholder="Tìm kiếm" allowClear enterButton size="large" onSearch={onSearch} />
			<Table rowKey="taiKhoan" columns={columns} dataSource={data} />
		</div>
	);
}
