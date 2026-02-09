"use client";

import { useState, useEffect, useCallback } from "react";
import { BybitBalanceResponse } from "../types/bybit";

export const useGetMoney = () => {
  // data의 타입을 BybitBalanceResponse 또는 null로 지정
  const [data, setData] = useState<BybitBalanceResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMoney = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://localhost:8000/api/getMoney");

      if (!response.ok) throw new Error("서버 응답 에러");

      const result: BybitBalanceResponse = await response.json();
      setData(result);
    } catch (err) {
      // err가 unknown이므로 타입 가드 사용
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMoney();
  }, [fetchMoney]);

  return { data, loading, error, refetch: fetchMoney };
};
