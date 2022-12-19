import { Carousel } from "antd";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCarouselAction } from "../../../../redux/actions/CarouselActions";
import "./HomeCarousel.css";

export default function HomeCarousel(props) {
	const { arrBannerImg } = useSelector((state) => state.CarouselReducer);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCarouselAction());
	}, []);

	const renderImg = () => {
		return arrBannerImg.map((item, index) => {
			return (
				<div key={index}>
					<div className="contentStyle" style={{ backgroundImage: `url(${item.hinhAnh})` }}></div>
				</div>
			);
		});
	};

	return (
		<Carousel autoplay effect="fade">
			{renderImg()}
		</Carousel>
	);
}
