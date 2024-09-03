import React, { useReducer } from "react";
import { StoreContext } from "../context/Context";
import { SIGN_IN, SIGN_OUT } from "../store/action/action";
import { signedInReducer } from "../store/reducer/signInReducer";
import { initialSignedInState } from "../store/state/state";

// Custom store provider - dispatch action via context
export default function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(signedInReducer, initialSignedInState);
  // dispatch and action for user login
  const userIsLoggedIn = () => {
    console.log("Sign In Action is dispatched....🚀");
    dispatch({ type: SIGN_IN, payload: true });
  };

  // dispatch an action for user Logout
  const userIsSignedOut = () => {
    console.log("Logout Action is dispatched....🚀");
    dispatch({ type: SIGN_OUT, payload: false });
  };
  return (
    <StoreContext.Provider value={{ state, userIsLoggedIn, userIsSignedOut }}>
      {children}
    </StoreContext.Provider>
  );
}
