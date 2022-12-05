import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";

export const HomeTemplate = (props) => {
	const { Component, ...restProps } = props;
	useEffect(() => {
		window.scrollTo(0, 0);
	});
	return (
		<Route
			{...restProps}
			render={(propsRoute) => {
				return (
					<div style={{ backgroundColor: "rgb(38,50,56)" }}>
						<Header {...propsRoute} />
						<Component {...propsRoute} />
						<Footer />
					</div>
				);
			}}
		/>
	);
};
