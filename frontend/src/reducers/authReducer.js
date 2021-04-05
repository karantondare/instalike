import { AUTHENTICATION, LOGOUT } from "../constants/actionTypes";

const initialState = { authData: null };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATION:
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));

      return {
        ...state,
        authData: action.payload,
      };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
