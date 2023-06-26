import React, { useContext, useReducer, createContext, ReactNode, useEffect } from "react";
import { User } from "firebase/auth";
type initialState = {
  user: null | User;
};
type actionType = "Login" | "Logout";
type action = {
  type: actionType;
  payload: User | null;
};
type authValue = {
  dispatch: React.Dispatch<action>;
  state: initialState;
};
type reducerFunc = (state: initialState, action: action) => initialState;
const AuthContext = createContext<authValue | null>(null);
function reducer(state: initialState, action: action) {
  switch (action.type) {
    case "Login":
      return { ...state, user: action.payload };
    case "Logout":
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
function useAuth() {
  return useContext(AuthContext);
}
function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer<reducerFunc>(reducer, { user: null });
  useEffect(()=>{
    
  },[]);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
export default useAuth;
export { AuthProvider, authValue };
