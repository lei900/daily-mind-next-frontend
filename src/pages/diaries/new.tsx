import { useEffect } from "react";
import { useRouter } from "next/router";

import { useAuthContext } from "context/AuthContext";

import DiaryForm from "components/entries/diaries/DiaryForm";

export default function NewDiaryPage() {
  const { currentUser, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push("/login");
    }
  }, [loading, currentUser]);

  return <DiaryForm />;
}
