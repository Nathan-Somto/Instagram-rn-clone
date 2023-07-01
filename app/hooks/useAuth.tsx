import React, {
  useContext,
  useReducer,
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import Loader from "../components/Shared/Loader";
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
  user: null | User;
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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "Login", payload: user });
      } /* else {
        dispatch({ type: "Logout", payload: user });
      } */
      setLoading(false);
    });
    return unSub;
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
export default useAuth;
export { AuthProvider, authValue };
