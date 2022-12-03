import { SET_CAROUSEL } from "../types/CarouselType";

const stateDefault = {
   arrBannerImg: [
      {
         maBanner: 1,
         maPhim: 1282,
         hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png",
      },
   ],
};

export const CarouselReducer = (state = stateDefault, action) => {
   switch (action.type) {
      case SET_CAROUSEL:
         return { ...state, arrBannerImg: action.arrBannerImg };

      default:
         return { ...state };
   }
};
