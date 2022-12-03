import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { history } from "../../../../App";
import { useSelector } from "react-redux";
import { LogoutOutlined } from "@ant-design/icons";
import _ from "lodash";
import { TOKEN, USER_LOGIN } from "../../../../utils/settings/config";
import logoImg from "../../../../assets/images/zyro-image.png";

export default function Header(props) {
	const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

	const renderLogin = () => {
		if (_.isEmpty(userLogin)) {
			return (
				<button
					onClick={() => {
						history.push("/login");
					}}
					className="self-center px-8 py-3 rounded">
					Đăng nhập
				</button>
			);
		}
		return (
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
					className="flex items-center">
					Đăng xuất
					<LogoutOutlined style={{ fontSize: 20, marginLeft: 5 }} />
				</button>
			</Fragment>
		);
	};
	return (
		<header className="p-4 text-white  top-0 w-full z-10 ">
			<div className="container flex justify-between h-16 mx-auto">
				<NavLink rel="noopener noreferrer" to="/" aria-label="Back to homepage" className="flex items-center p-2">
					<img src={logoImg} alt="logo" width={150} />
				</NavLink>
				<ul className="items-stretch hidden space-x-3 lg:flex  ">
					<li className="flex">
						<NavLink
							rel="noopener noreferrer"
							to="/home"
							className="flex items-center px-4 -mb-1 dark:border-transparent dark:text-violet-400 dark:border-violet-400 text-white"
							activeClassName="border-b-2 border-white">
							Trang chủ
						</NavLink>
					</li>
					<li className="flex">
						<NavLink
							rel="noopener noreferrer"
							to="/contact"
							className="flex items-center px-4 -mb-1  dark:border-transparent text-white"
							activeClassName="border-b-2 border-white">
							Liên hệ
						</NavLink>
					</li>
					<li className="flex">
						<NavLink
							rel="noopener noreferrer"
							to="/news"
							className="flex items-center px-4 -mb-1 dark:border-transparent text-white"
							activeClassName="border-b-2 border-white">
							Tin tức
						</NavLink>
					</li>
				</ul>
				<div className="items-center flex-shrink-0 hidden lg:flex">{renderLogin()}</div>
				<button className="p-4 lg:hidden">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						className="w-6 h-6 dark:text-gray-100">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
					</svg>
				</button>
			</div>
		</header>
	);
}
