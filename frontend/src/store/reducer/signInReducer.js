/**
 * Sign In Reducer: Update user state on login and logout
 */

import { initialSignedInState } from "../state/state";
import { SIGN_IN, SIGN_OUT } from "../action/action";
//TODO: BUG: looase state with page refresh.
// TODO: Search for: React reducer loose state with page refresh... etc
// Check for action and update user status based on that
export const signedInReducer = (state = initialSignedInState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return (state = action.payload);
    case SIGN_OUT:
      return (state = action.payload);
    default:
      return state;
  }
};
