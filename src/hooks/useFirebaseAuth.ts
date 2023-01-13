import { useState, useEffect } from "react";
import nookies from "nookies";
import {
  User,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
  onIdTokenChanged,
  signInAnonymously,
} from "firebase/auth";
import { useRouter } from "next/router";

import { auth } from "lib//firebase/initFirebase";
import { clearUserInfoCookies } from "utils/manageCookies";

export default function useFirebaseAuth() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    if (result) {
      // The signed-in user info.
      const user = result.user;
      // This gives you a Google Access Token.You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential?.accessToken;
      router.push("/");
      return user;
    }
  };

  const loginWithTwitter = async () => {
    const provider = new TwitterAuthProvider();
    const result = await signInWithPopup(auth, provider);

    if (result) {
      const user = result.user;
      router.push("/");
      return user;
    }
  };

  const loginAnonymously = async () => {
    const result = await signInAnonymously(auth);

    if (result) {
      const user = result.user;
      router.push("/");
      return user;
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
    loginWithGoogle,
    loginWithTwitter,
    loginAnonymously,
    logout,
  };
}
