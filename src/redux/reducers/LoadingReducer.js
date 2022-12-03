import { HIDE_LOADING, SHOW_LOADING } from "../types/LoadingType";

const initialState = {
	isLoading: false,
};

export const LoadingReducer = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_LOADING:
			return { ...state, isLoading: true };
		case HIDE_LOADING:
			return { ...state, isLoading: false };
		default:
			return state;
	}
};
