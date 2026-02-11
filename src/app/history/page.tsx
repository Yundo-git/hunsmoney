"use client";

import { useState, useEffect } from "react";
import { CryptoInfoHistory } from "../components/home/CryptoInfoHistory";
import { useGetTradeHistory } from "../hooks/useGetTradeHistory";
import { Navbar } from "../components/nav/Navbar";

export default function HistoryPage() {
  const { data: history, loading, error, refetch } = useGetTradeHistory();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="lg:ml-64 lg:mt-20 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">거래 내역</h1>
            <p className="text-gray-500 text-sm">
              최근 종료된 포지션의 실현 손익 내역입니다.
            </p>
          </div>

          {/* CryptoInfoHistory 컴포넌트로 거래 내역 표시 */}
          <CryptoInfoHistory history={history} loading={loading} />
        </div>
      </main>
    </div>
  );
}
