import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MultipleRowsSlick } from "../../components/ReactSlick/MultipleRowSlick";
import { layDSPhimAction } from "../../redux/actions/QuanLyPhimAction";
import { layDSHeThongRapAction } from "../../redux/actions/QuanLyRapAction";
import HomeCarousel from "../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel";
import HomeMenu from "./HomeMenu/HomeMenu";

export default function Home(props) {
	const { arrFilm } = useSelector((state) => state.QuanLyPhimReducer);
	const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(layDSPhimAction(""));
		dispatch(layDSHeThongRapAction());
	}, []);
	return (
		<div className="container mx-auto">
			<HomeCarousel />
			<div>
				<MultipleRowsSlick arrFilm={arrFilm} />
			</div>
			<HomeMenu heThongRapChieu={heThongRapChieu} />
		</div>
	);
}
