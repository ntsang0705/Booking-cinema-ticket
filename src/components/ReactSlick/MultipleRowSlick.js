import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU } from "../../redux/types/QuanLyPhimType";
import FilmCardFlip from "../Film/FilmCardFlip";
import styleSlick from "./MultipleRowSlick.module.css";
import { layDSPhimAction } from "../../redux/actions/QuanLyPhimAction";

const SampleNextArrow = (props) => {
	const { className, style, onClick } = props;
	return (
		<div
			className={`${className} ${styleSlick["slick-next"]}`}
			style={{ ...style, display: "block" }}
			onClick={onClick}
		/>
	);
};

const SamplePrevArrow = (props) => {
	const { className, style, onClick } = props;
	return (
		<div
			className={`${className} ${styleSlick["slick-prev"]}`}
			style={{ ...style, display: "block" }}
			onClick={onClick}
		/>
	);
};

export const MultipleRowsSlick = (props) => {
	const dispatch = useDispatch();
	const { dangChieu, sapChieu } = useSelector((state) => state.QuanLyPhimReducer);
	let activeClassDC = dangChieu ? "active_Film" : "non_active_Film";
	let activeClassSC = sapChieu ? "active_Film" : "non_active_Film";
	const renderFilm = () => {
		return props.arrFilm.map((film, index) => {
			return <FilmCardFlip key={index} film={film} />;
		});
	};

	const settings = {
		className: "center",
		centerMode: true,
		infinite: true,
		slidesToShow: 5,
		autoplay: true,
		autoplaySpeed: 2000,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};

	useEffect(() => {
		dispatch(layDSPhimAction(""));
	}, []);

	return (
		<div>
			<div className="text-center mt-10">
				<button
					type="button"
					className={`${styleSlick[activeClassDC]} px-8 py-3 font-semibold border rounded border-gray-800 text-gray-800 mr-2`}
					onClick={() => {
						dispatch({ type: SET_FILM_DANG_CHIEU });
					}}>
					PHIM ĐANG CHIẾU
				</button>
				<button
					type="button"
					className={` ${styleSlick[activeClassSC]} px-8 py-3 font-semibold border rounded border-gray-800 text-gray-800`}
					onClick={() => {
						dispatch({ type: SET_FILM_SAP_CHIEU });
					}}>
					PHIM SẮP CHIẾU
				</button>
			</div>

			<Slider {...settings}>{renderFilm()}</Slider>
		</div>
	);
};
