import { quanLyPhimServices } from "../../services/QuanLyPhimServices";
import { SET_CAROUSEL } from "../types/CarouselType";

export const getCarouselAction = () => {
   return async (dispatch) => {
      try {
         const result = await quanLyPhimServices.layDanhSachBanner();
         dispatch({ type: SET_CAROUSEL, arrBannerImg: result.data.content });
      } catch (error) {
         console.log(error);
      }
   };
};
