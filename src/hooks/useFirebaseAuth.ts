import { useState, useEffect } from "react";
import nookies from "nookies";
import {
  User,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
  FacebookAuthProvider,
  onIdTokenChanged,
  signInAnonymously,
  linkWithPopup,
} from "firebase/auth";
import { useRouter } from "next/router";

import { auth } from "lib//firebase/initFirebase";
import { clearUserInfoCookies } from "utils/manageCookies";
import { toast } from "react-toastify";

export default function useFirebaseAuth() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getProvider = (method: string) => {
    switch (method) {
      case "google":
        return new GoogleAuthProvider();
      case "twitter":
        return new TwitterAuthProvider();
      case "facebook":
        return new FacebookAuthProvider();
      default:
        return new GoogleAuthProvider();
    }
  };

  const loginWithFirebase = async (method: string) => {
    const getResult = () => {
      if (method === "guest") {
        return signInAnonymously(auth);
      } else {
        return signInWithPopup(auth, getProvider(method));
      }
    };

    const result = await getResult();

    if (result) {
      const user = result.user;
      router.push("/");
      return user;
    }
  };

  const upgradeAccount = async (method: string) => {
    const user = await linkWithPopup(auth.currentUser!, getProvider(method))
      .then((result) => {
        // Accounts successfully linked.
        toast.success("アップグレードしました。");
        return result.user;
      })
      .catch((error) => {
        console.log(error);
        toast.error("アップグレード失敗しました。もう一度お試しください。");
      });

    if (user) {
      setLoading(true);
      setCurrentUser(user);
      const token = await user.getIdToken();
      nookies.set(undefined, "token", token, { path: "/" });
      setLoading(false);
      router.push("/");
    }
  };

  const clear = () => {
    setCurrentUser(null);
    clearUserInfoCookies();
    setLoading(false);
    router.push("/");
  };

  const logout = () => signOut(auth).then(clear);

  // callback triggered on user's sign-in state change.
  const nextOrObserver = async (user: User | null) => {
    if (!user) {
      setLoading(false);
      setCurrentUser(null);
      nookies.set(undefined, "token", "", { path: "/" });
      return;
    }
    setLoading(true);
    const token = await user.getIdToken();
    setCurrentUser(user);
    nookies.set(undefined, "token", token, { path: "/" });
    setLoading(false);
  };

  // listen for token changes
  // write new token as a cookie
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, nextOrObserver);
    return unsubscribe;
  }, []);

  // force refresh the token every 60 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 60 * 60 * 1000);

    return () => clearInterval(handle);
  }, []);

  return {
    currentUser,
    loading,
    loginWithFirebase,
    upgradeAccount,
    logout,
  };
}
