import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router";
import { TOKEN, USER_LOGIN } from "../../utils/settings/config";
import { Layout, Menu } from "antd";
import {
	TeamOutlined,
	UserAddOutlined,
	BarChartOutlined,
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	LogoutOutlined,
	FileAddOutlined,
	ProfileOutlined,
	UnorderedListOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { history } from "../../App";
import logo from "../../assets/images/backgroundLogin.jpg";

export const AdminTemplate = (props) => {
	const { Component, ...restParam } = props;
	const { Header, Content, Footer, Sider } = Layout;
	const [collapsed, setCollapsed] = useState(false);
	const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
	useEffect(() => {
		window.scrollTo(0, 0);
	});
	if (!localStorage.getItem(USER_LOGIN)) {
		alert("Bạn không có quyền truy cập vào trang này !");
		return <Redirect to="/" />;
	}

	if (userLogin.maLoaiNguoiDung !== "QuanTri") {
		alert("Bạn không có quyền truy cập vào trang này !");
		return <Redirect to="/" />;
	}

	const operations = (
		<Fragment>
			{_.isEmpty(userLogin) ? (
				""
			) : (
				<Fragment>
					<button
						className="mx-5 flex items-center text-lg"
						onClick={() => {
							history.push("/profile");
						}}>
						<span className="mr-3 w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center">
							{userLogin.taiKhoan.substr(0, 1).toUpperCase()}
						</span>{" "}
						Xin chào, {userLogin.taiKhoan}
					</button>
					<button
						onClick={() => {
							localStorage.removeItem(USER_LOGIN);
							localStorage.removeItem(TOKEN);
							history.push("/home");
							window.location.reload();
						}}
						className="flex items-center mr-5">
						Đăng xuất
						<LogoutOutlined style={{ fontSize: 20, marginLeft: 5 }} />
					</button>
				</Fragment>
			)}
		</Fragment>
	);
	return (
		<Route
			{...restParam}
			render={(propsRoute) => {
				return (
					<Layout style={{ minHeight: "100vh" }}>
						<Sider trigger={null} collapsible collapsed={collapsed}>
							<div className="logo p-2">
								<img src={logo} alt="logo" />
							</div>
							<div
								className={collapsed ? "text-center" : "text-right pr-2"}
								onClick={() => {
									setCollapsed(!collapsed);
								}}
								style={{ cursor: "pointer", color: "#fff", fontSize: 20 }}>
								{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
							</div>
							<Menu
								theme="dark"
								mode="inline"
								defaultSelectedKeys={["1"]}
								items={[
									{
										key: "1",
										icon: <BarChartOutlined />,
										label: <NavLink to="/admin">Dashboard</NavLink>,
									},
									{
										key: "2",
										icon: <TeamOutlined />,
										label: "Users",
										children: [
											{
												key: "21",
												icon: <ProfileOutlined />,
												label: <NavLink to="/admin/users">Users</NavLink>,
											},
											{
												key: "22",
												icon: <UserAddOutlined />,
												label: <NavLink to="/admin/users/adduser">Add user</NavLink>,
											},
										],
									},
									{
										key: "3",
										icon: <UnorderedListOutlined />,
										label: `Films`,
										children: [
											{
												key: "31",
												icon: <ProfileOutlined />,
												label: <NavLink to="/admin/films">Films</NavLink>,
											},
											{
												key: "32",
												icon: <FileAddOutlined />,
												label: <NavLink to="/admin/films/addfilm">Add film</NavLink>,
											},
										],
									},
								]}
							/>
						</Sider>
						<Layout>
							<Header className=" flex justify-end " style={{ padding: 0, color: "#fff" }}>
								{operations}
							</Header>
							<Content
								className="site-layout-background"
								style={{
									margin: "24px 16px",
									padding: 24,
									minHeight: 280,
									backgroundColor: "rgb(245, 245, 242)",
								}}>
								<Component {...propsRoute} />
							</Content>
						</Layout>
					</Layout>
				);
			}}
		/>
	);
};
