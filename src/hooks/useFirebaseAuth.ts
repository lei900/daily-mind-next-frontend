import { useState, useEffect } from "react";
import {
  User,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import { useRouter } from "next/router";

import { auth } from "lib//firebase/initFirebase";

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

  const clear = () => {
    setCurrentUser(null);
    setLoading(false);
  };

  const logout = () => signOut(auth).then(clear);

  // callback triggered on user's sign-in state change.
  const nextOrObserver = async (user: User | null) => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setCurrentUser(user);
    setLoading(false);
  };

  // listen for user's sign-in state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, nextOrObserver);
    return unsubscribe;
  }, []);

  return {
    currentUser,
    loading,
    loginWithGoogle,
    loginWithTwitter,
    logout,
  };
}
