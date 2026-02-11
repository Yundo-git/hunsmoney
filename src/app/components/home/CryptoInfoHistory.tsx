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
        <h2 className="text-xl font-bold">최근 매매 기록</h2>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-500">최근 {history.length}건</span>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3 py-1 text-sm border border-gray-700 rounded-lg bg-background hover:bg-gray-800 transition-colors"
          >
            <span>{isOpen ? "닫기" : "상세 보기"}</span>
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

      {/* 요약 바 */}
      {!isOpen && history && history.length > 0 && (
        <div className="mb-4 p-3 rounded-lg border border-gray-700 hover:bg-gray-900/30">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">최근 거래 요약</span>
            <span className="font-bold text-point">
              {history.length}건 중 수익{" "}
              {Array.isArray(history)
                ? history.filter((t) => Number(t.closedPnl) > 0).length
                : 0}
              건
            </span>
          </div>
        </div>
      )}

      {/* 모달 창 */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background border border-gray-700 rounded-xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col">
            {/* 헤더 */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <div>
                <h3 className="text-xl font-bold">최근 매매 상세 기록</h3>
                <p className="text-xs text-gray-500 mt-1">
                  종료된 포지션의 실현 손익 내역입니다.
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* 테이블 내용 */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-gray-500 text-[11px] uppercase border-b border-gray-800">
                      <th className="py-3 px-2">종목/시간</th>
                      <th className="py-3 px-2">수량</th>
                      <th className="py-3 px-2">진입/종료가</th>
                      <th className="py-3 px-2 text-right">수익률(원금대비)</th>
                      <th className="py-3 px-2 text-right">실현손익 (USDT)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-900">
                    {history &&
                      Array.isArray(history) &&
                      history.map((trade) => {
                        const pnl = Number(trade.closedPnl);
                        const isProfit = pnl >= 0;

                        // 수익률 계산 로직 (진입 원금 대비 실제 수익금 비율)
                        const calculateProfitRate = () => {
                          const entryPrice = Number(trade.entryPrice);
                          const qty = Number(trade.qty);

                          const principal = entryPrice * qty; // 투입 원금
                          if (principal === 0)
                            return { rate: "0.00", color: "text-gray-500" };

                          const rate = (pnl / principal) * 100;
                          return {
                            rate: rate.toFixed(2),
                            color:
                              rate > 0
                                ? "text-red-500"
                                : rate < 0
                                  ? "text-blue-500"
                                  : "text-gray-400",
                          };
                        };

                        const profitInfo = calculateProfitRate();

                        return (
                          <tr
                            key={trade.id}
                            className="hover:bg-gray-800/20 transition-colors"
                          >
                            <td className="py-4 px-2">
                              <div className="font-bold text-sm">
                                {trade.symbol}
                              </div>
                              <div className="text-[10px] text-gray-500">
                                {trade.updatedTime}
                              </div>
                            </td>
                            <td className="py-4 px-2 text-sm text-gray-300">
                              {trade.qty}
                            </td>
                            <td className="py-4 px-2 text-[11px]">
                              <div className="text-gray-400">
                                In: {Number(trade.entryPrice).toLocaleString()}
                              </div>
                              <div className="text-gray-400">
                                Out: {Number(trade.exitPrice).toLocaleString()}
                              </div>
                            </td>
                            <td
                              className={`py-4 px-2 text-right font-bold text-sm ${profitInfo.color}`}
                            >
                              {profitInfo.rate}%
                            </td>
                            <td
                              className={`py-4 px-2 text-right font-bold text-sm ${isProfit ? "text-red-500" : "text-blue-500"}`}
                            >
                              {isProfit ? "+" : ""}
                              {pnl.toFixed(4)}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
