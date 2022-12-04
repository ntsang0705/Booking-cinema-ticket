import "./App.css";
import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router-dom";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import CheckOutTemplate from "./templates/CheckOutTemplate/CheckOutTemplate";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Login from "./pages/Login/Login";
import Detail from "./pages/Detail/Detail";
import Checkout from "./pages/Checkout/Checkout";
import Profile from "./pages/Profile/Profile";

import Loading from "./components/Loading.js/Loading";
import { AdminTemplate } from "./templates/AdminTemplate/AdminTemplate";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Films from "./pages/Admin/Films/Films";
import ShowTime from "./pages/Admin/Films/Showtime/ShowTime";
import Addnew from "./pages/Admin/Films/AddNew/Addnew";
import Edit from "./pages/Admin/Films/Edit/Edit";
import Users from "./pages/Admin/Users/Users";
import Adduser from "./pages/Admin/Users/Add user/Adduser";
import EditUser from "./pages/Admin/Users/Edit/EditUser";
export const history = createBrowserHistory();
export default function App() {
	return (
		<Router>
			<Loading />
			<Switch>
				<HomeTemplate exact path="https://ntsang0705.github.io/Booking-cinema-ticket/#/" Component={Home} />
				<HomeTemplate exact path="/home" Component={Home} />
				<HomeTemplate exact path="/contact" Component={Contact} />
				<HomeTemplate exact path="/news" Component={News} />
				<HomeTemplate exact path="/detail/:id" Component={Detail} />
				<HomeTemplate exact path="/profile" Component={Profile} />

				<Route exact path="/login" component={Login} />

				<CheckOutTemplate exact path="/checkout/:id" Component={Checkout} />

				<AdminTemplate exact path="/admin" Component={Dashboard} />
				<AdminTemplate exact path="/admin/films" Component={Films} />
				<AdminTemplate exact path="/admin/films/addfilm" Component={Addnew} />
				<AdminTemplate exact path="/admin/films/edit/:id" Component={Edit} />
				<AdminTemplate exact path="/admin/films/showtime/:id" Component={ShowTime} />
				<AdminTemplate exact path="/admin/users" Component={Users} />
				<AdminTemplate exact path="/admin/users/adduser" Component={Adduser} />
				<AdminTemplate exact path="/admin/users/edit/:id" Component={EditUser} />
			</Switch>
		</Router>
	);
}
