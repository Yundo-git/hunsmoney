"use client";

import { useState } from "react";

interface TradeHistoryItem {
  id: string;
  symbol: string;
  closedPnl: string;
  entryPrice: string;
  exitPrice: string;
  qty: string;
  updatedTime: string;
}

interface CryptoInfoHistoryProps {
  history: TradeHistoryItem[] | null;
  loading?: boolean;
}

export const CryptoInfoHistory = ({
  history,
  loading,
}: CryptoInfoHistoryProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (loading) {
    return (
      <div className="py-10 text-center text-gray-500 text-sm">
        기록 로딩 중...
      </div>
    );
  }

  if (!history || history.length === 0) {
    return (
      <div className="border-t border-gray-800 pt-4 mt-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">최근 매매 기록</h2>
          <span className="text-xs text-gray-500">최근 10건</span>
        </div>
        <div className="py-10 text-center text-gray-500 text-sm border border-dashed border-gray-800 rounded-xl">
          최근 종료된 거래 기록이 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-gray-800 pt-4 mt-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold    ">최근 매매 기록</h2>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-500">최근 {history.length}건</span>

          {/* 드롭다운 버튼 */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-3 py-1 text-sm border border-gray-700 rounded-lg bg-background hover:bg-gray-800 transition-colors"
            >
              <span>상세 보기</span>
              <svg
                className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 펼치기 전에 맨 위에 있는 애만 출력 */}
      {!isOpen && history.length > 0 && (
        <div className="mb-4 p-3 rounded-lg border border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-sm ">최근 거래 요약</span>
            <span className="text-sm font-bold text-point">
              총 {history.length}건 중 수익{" "}
              {history.filter((t) => Number(t.closedPnl) > 0).length}건
            </span>
          </div>
        </div>
      )}

      {/* 테이블 - 드롭다운이 열릴 때만 표시 */}
      {isOpen && (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-gray-800">
                <th className="py-3 px-2">종목/시간</th>
                <th className="py-3 px-2">수량</th>
                <th className="py-3 px-2">진입/종료가</th>
                <th className="py-3 px-2 text-right">실현손익 (USDT)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-900">
              {history.map((trade) => {
                const isProfit = Number(trade.closedPnl) >= 0;

                return (
                  <tr
                    key={trade.id}
                    className="hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="py-4 px-2">
                      <div className="font-bold text-sm">{trade.symbol}</div>
                      <div className="text-[10px] text-gray-500">
                        {trade.updatedTime}
                      </div>
                    </td>
                    <td className="py-4 px-2 text-sm text-gray-300">
                      {trade.qty}
                    </td>
                    <td className="py-4 px-2 text-xs">
                      <div className="text-gray-400">
                        In: {Number(trade.entryPrice).toLocaleString()}
                      </div>
                      <div className="text-gray-400">
                        Out: {Number(trade.exitPrice).toLocaleString()}
                      </div>
                    </td>
                    <td
                      className={`py-4 px-2 text-right font-bold text-sm ${isProfit ? "text-red-500" : "text-blue-500"}`}
                    >
                      {isProfit ? "+" : ""}
                      {Number(trade.closedPnl).toFixed(4)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
