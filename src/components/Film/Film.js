import React from "react";

export default function Film(props) {
   const { film } = props;
   return (
      <div className="h-full border-2 border-gray-200 border-opacity-75 rounded-lg overflow-hidden mr-1 bg-gray-100 text-center">
         <div style={{ backgroundImage: `url(${film.hinhAnh})`, height: 300, backgroundPosition: "center", backgroundSize: "cover" }}></div>
         <div className="p-6">
            <h1 className="title-font text-xl title-font font-medium text-gray-900 mb-3 h-16">{film.tenPhim}</h1>
            <p className="leading-relaxed mb-3 h-16">{film.moTa.length > 100 ? film.moTa.slice(0, 100) + " ..." : film.moTa}</p>
            <div className="text-center">
               <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                  ĐẶT VÉ
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M5 12h14" />
                     <path d="M12 5l7 7-7 7" />
                  </svg>
               </a>
            </div>
         </div>
      </div>
   );
}
