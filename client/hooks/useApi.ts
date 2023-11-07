import { useEffect, useState } from "react";

// minimal useQuery lookalike
export function useApi<T extends any = any>(
  url: string,
  options?: RequestInit
) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<any>();

  useEffect(() => {
    setData(undefined);
    setError(undefined);
    setLoading(true);

    fetch(url, options)
      .then((res) => res.json())
      .then((body) => setData(body))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [url, options]);

  return { loading, data, error };
}
