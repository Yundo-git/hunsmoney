import { useState, useEffect, useCallback } from "react";

export const useGetPosition = (symbol: string = "ETHUSDT") => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosition = useCallback(async () => {
    try {
      setLoading(true);
      // 백엔드 엔드포인트에 맞춰 호출 (쿼리 스트링으로 심볼 전달 가능)
      const response = await fetch(`http://localhost:8000/api/getPosition`);
      console.log("response >>> ", response);
      if (!response.ok) throw new Error("포지션 정보 응답 에러");

      const result = await response.json();
      setData(result);
      console.log("result >>> ", result);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [symbol]);

  useEffect(() => {
    fetchPosition();
  }, [fetchPosition]);

  return { data, loading, error, refetch: fetchPosition };
};
