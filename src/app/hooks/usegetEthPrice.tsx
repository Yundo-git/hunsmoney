"use client";

import { useState, useEffect, useCallback } from "react";
import { EthPriceResponse } from "../types/ethPrice";

export const usegetEthPrice = () => {
  // data의 타입을 EthPriceResponse 또는 null로 지정
  const [data, setData] = useState<EthPriceResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEthPrice = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://localhost:8000/api/getEthPrice");

      if (!response.ok) throw new Error("서버 응답 에러");

      const result: EthPriceResponse = await response.json();

      console.log("usegetEthPrice >>> ", result);
      setData(result);
    } catch (err) {
      // err가 unknown이므로 타입 가드 사용
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEthPrice();
  }, [fetchEthPrice]);

  return { data, loading, error, refetch: fetchEthPrice };
};
