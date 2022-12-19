import React from "react";
import { NavLink } from "react-router-dom";
import "./FilmCardFlip.css";

export default function FilmCardFlip(props) {
	const { film } = props;
	return (
		<div className="flip-card mt-10">
			<div className="flip-card-inner">
				<div
					className="flip-card-front"
					style={{
						backgroundImage: `url(${film.hinhAnh})`,
						backgroundPosition: "center",
						backgroundSize: "cover",
					}}></div>
				<div
					className="flip-card-back"
					style={{
						backgroundImage: `url(${film.hinhAnh})`,
						backgroundPosition: "center",
						backgroundSize: "cover",
						position: "relative",
					}}>
					<div
						className="w-full h-full text-center"
						style={{ position: "absolute", backgroundColor: "rgba(0,0,0,.8)" }}>
						<div className="lg:text-base  text-2xl mt-2 font-bold p-2">{film.tenPhim}</div>
						<p className=".mota p-2"> {film.moTa.length > 100 ? film.moTa.slice(0, 100) + "  ..." : film.moTa}</p>
					</div>
					<NavLink
						to={`/detail/${film.maPhim}`}
						className="datVe__button w-full 2xl:text-xl text-white bg-red-500 cursor-pointer font-bold absolute bottom-0 left-0">
						ĐẶT VÉ
					</NavLink>
				</div>
			</div>
		</div>
	);
}
