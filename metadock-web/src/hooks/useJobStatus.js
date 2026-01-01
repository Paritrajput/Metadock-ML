import { useEffect, useState } from "react";
import { getJobStatus } from "../services/api";

export default function useJobStatus(jobId) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await getJobStatus(jobId);
      setData(res);
    }, 1500);

    return () => clearInterval(interval);
  }, [jobId]);

  return data;
}
