import React, { Fragment, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { USER_LOGIN } from "../../utils/settings/config";

export const CheckOutTemplate = (props) => {
	const { Component, ...restProps } = props;
	useEffect(() => {
		window.scrollTo(0, 0);
	});
	if (localStorage.getItem(USER_LOGIN)) {
		return (
			<Route
				{...restProps}
				render={(propsRoute) => {
					return (
						<Fragment>
							<Component {...propsRoute} />
						</Fragment>
					);
				}}
			/>
		);
	} else {
		return <Redirect to="/login" />;
	}
};

export default CheckOutTemplate;
