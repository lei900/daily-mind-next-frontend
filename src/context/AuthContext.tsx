import { createContext, useContext, useState } from "react";
import { parseCookies } from "nookies";

import useFirebaseAuth from "hooks/useFirebaseAuth";
import { User } from "firebase/auth";
import { UserInfo } from "types/types";

interface AuthContext {
  currentUser: User | null;
  loading: boolean;
  loginWithGoogle: () => Promise<User | undefined>;
  loginWithTwitter: () => Promise<User | undefined>;
  logout: () => Promise<void>;
  userInfo: UserInfo;
  updateUserInfo: (newUserInfo: UserInfo) => void;
}

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthCtx = createContext({} as AuthContext);

const cookies = parseCookies();

export function AuthContextProvider({ children }: AuthProviderProps) {
  const { currentUser, loading, loginWithGoogle, loginWithTwitter, logout } =
    useFirebaseAuth();
  const [userInfo, setUserInfo] = useState({
    uid: cookies.uid,
    nickname: cookies.nickname,
    role: "general",
    avatar: cookies.avatar,
    bio: cookies.bio,
  });

  const updateUserInfo = (newUserInfo: UserInfo) => {
    setUserInfo({
      ...userInfo,
      uid: newUserInfo.uid,
      avatar: newUserInfo.avatar || "",
      nickname: newUserInfo.nickname,
      bio: newUserInfo.bio || "",
    });
  };

  const AuthContext: AuthContext = {
    currentUser: currentUser,
    loading: loading,
    loginWithGoogle: loginWithGoogle,
    loginWithTwitter: loginWithTwitter,
    logout: logout,
    userInfo: userInfo,
    updateUserInfo: updateUserInfo,
  };

  return <AuthCtx.Provider value={AuthContext}>{children}</AuthCtx.Provider>;
}
// custom hook to use the userContext and access currentUser and loading
export const useAuthContext = () => useContext(AuthCtx);
