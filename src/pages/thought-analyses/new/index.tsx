import { useEffect } from "react";
import { useRouter } from "next/router";

import { useAuthContext } from "context/AuthContext";
import AnalysisForm from "components/entries/thought-analyses/AnalysisForm";

export default function NewAnalysisPage() {
  const { currentUser, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push("/login");
    }
  }, [loading, currentUser]);

  return <AnalysisForm />;
}
