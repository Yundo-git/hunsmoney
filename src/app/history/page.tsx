"use client";

import { useState, useEffect } from "react";
import { CryptoInfoHistory } from "../components/home/CryptoInfoHistory";
import { useGetTradeHistory } from "../hooks/useGetTradeHistory";
import { Navbar } from "../components/nav/Navbar";

export default function HistoryPage() {
  const { data: history, loading, error, refetch } = useGetTradeHistory();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="lg:ml-64 lg:mt-20 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">거래 내역</h1>
            <p className="text-gray-500 text-sm">
              최근 종료된 포지션의 실현 손익 내역입니다.
            </p>
          </div>

          {/* Bybit 주문 API 기능 목록 */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Bybit 주문 API 기능 목록
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {[
                  {
                    method: "POST",
                    endpoint: "/v5/order/create",
                    desc: "주문 생성",
                    auth: "🔒",
                  },
                  {
                    method: "POST",
                    endpoint: "/v5/order/create-batch",
                    desc: "일괄 주문 생성",
                    auth: "🔒",
                  },
                  {
                    method: "POST",
                    endpoint: "/v5/order/amend",
                    desc: "주문 수정",
                    auth: "🔒",
                  },
                  {
                    method: "POST",
                    endpoint: "/v5/order/amend-batch",
                    desc: "일괄 주문 수정",
                    auth: "🔒",
                  },
                  {
                    method: "POST",
                    endpoint: "/v5/order/cancel",
                    desc: "주문 취소",
                    auth: "🔒",
                  },
                  {
                    method: "POST",
                    endpoint: "/v5/order/cancel-batch",
                    desc: "일괄 주문 취소",
                    auth: "🔒",
                  },
                  {
                    method: "POST",
                    endpoint: "/v5/order/cancel-all",
                    desc: "전체 주문 취소",
                    auth: "🔒",
                  },
                  {
                    method: "GET",
                    endpoint: "/v5/order/realtime",
                    desc: "실시간 주문 조회",
                    auth: "🔒",
                  },
                  {
                    method: "GET",
                    endpoint: "/v5/order/history",
                    desc: "주문 내역 조회",
                    auth: "🔒",
                  },
                  {
                    method: "GET",
                    endpoint: "/v5/order/execution-list",
                    desc: "체결 기록 조회",
                    auth: "🔒",
                  },
                  {
                    method: "GET",
                    endpoint: "/v5/order/fast-cancellation",
                    desc: "빠른 주문 취소 설정",
                    auth: "🔒",
                  },
                  {
                    method: "GET",
                    endpoint: "/v5/order/disconnected-cancel",
                    desc: "연결 해제 시 주문 취소 설정",
                    auth: "🔒",
                  },
                ].map((api, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <span className="text-xs font-mono bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded">
                      {api.method}
                    </span>
                    <span className="text-sm font-mono text-gray-600 dark:text-gray-300 flex-1">
                      {api.endpoint}
                    </span>
                    <span className="text-sm text-gray-700 dark:text-gray-200">
                      {api.desc}
                    </span>
                    <span className="text-xs">{api.auth}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CryptoInfoHistory 컴포넌트로 거래 내역 표시 */}
          <CryptoInfoHistory history={history} loading={loading} />
        </div>
      </main>
    </div>
  );
}
