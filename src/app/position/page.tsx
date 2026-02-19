"use client";

import { useState, useEffect } from "react";
import { useGetPosition } from "../hooks/useGetPosition";
import { usegetEthPrice } from "../hooks/usegetEthPrice";
import { Navbar } from "../components/nav/Navbar";
import { PositionItem } from "../types/position";

export default function PositionPage() {
  const {
    data: positionData,
    loading: positionLoading,
    error: positionError,
    refetch: refetchPosition,
  } = useGetPosition();
  const {
    data: ethPriceData,
    loading: ethPriceLoading,
    error: ethPriceError,
  } = usegetEthPrice();

  // 로딩 상태
  if (positionLoading || ethPriceLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="lg:ml-64 lg:mt-20 p-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-point mx-auto mb-4"></div>
                <p className="text-gray-500">포지션 데이터를 불러오는 중...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // 에러 상태
  if (positionError || ethPriceError) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="lg:ml-64 lg:mt-20 p-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <p className="text-red-500 mb-2">데이터 로딩 실패</p>
                <p className="text-gray-500 text-sm">
                  {positionError || ethPriceError}
                </p>
                <button
                  onClick={() => {
                    refetchPosition();
                  }}
                  className="mt-4 px-4 py-2 bg-point text-white rounded-lg hover:bg-point/80 transition-colors"
                >
                  다시 시도
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // 포지션 데이터가 없을 때
  if (
    !positionData ||
    !positionData.result ||
    !positionData.result.list ||
    positionData.result.list.length === 0
  ) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="lg:ml-64 lg:mt-20 p-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl lg:text-3xl font-bold mb-2">
                현재 포지션
              </h1>
              <p className="text-gray-500 text-sm">
                보유 중인 포지션 정보를 확인할 수 있습니다.
              </p>
            </div>

            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="text-gray-400 text-6xl mb-4">📊</div>
                <p className="text-gray-500 mb-2">
                  현재 보유 중인 포지션이 없습니다
                </p>
                <p className="text-gray-400 text-sm">
                  새로운 포지션을 열어주세요
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const positions = positionData.result.list;
  // const currentEthPrice = ethPriceData?.result?.list?.[0]?.price || "0";

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="lg:ml-64 lg:mt-20 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">현재 포지션</h1>
            <p className="text-gray-500 text-sm">
              보유 중인 포지션 정보를 확인할 수 있습니다.
            </p>
          </div>

          {/* 포지션 카드 그리드 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {positions.map((position: PositionItem) => {
              const isProfit = Number(position.unrealisedPnl) > 0;
              const profitRate = position.percentage
                ? Number(position.percentage).toFixed(2)
                : "0.00";

              return (
                <div
                  key={position.symbol}
                  className="border border-gray-700 rounded-xl p-6 bg-background hover:shadow-lg transition-shadow"
                >
                  {/* 포지션 헤더 */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{position.symbol}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          position.side === "Buy"
                            ? "bg-green-500/20 text-green-500"
                            : "bg-red-500/20 text-red-500"
                        }`}
                      >
                        {position.side === "Buy" ? "Long" : "Short"}
                      </span>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-lg font-bold ${isProfit ? "text-point" : "text-blue-500"}`}
                      >
                        {isProfit ? "+" : ""}
                        {Number(position.unrealisedPnl).toFixed(4)} USDT
                      </div>
                      <div
                        className={`text-sm ${isProfit ? "text-point" : "text-blue-500"}`}
                      >
                        ({profitRate}%)
                      </div>
                    </div>
                  </div>

                  {/* 포지션 상세 정보 */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">포지션 크기</span>
                      <span className="font-medium">{position.size}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">진입가</span>
                      <span className="font-medium">
                        ${Number(position.entryPrice).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">마크가</span>
                      <span className="font-medium">
                        ${Number(position.markPrice).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">레버리지</span>
                      <span className="font-medium">{position.leverage}x</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">유지증거금</span>
                      <span className="font-medium">
                        ${Number(position.margin).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* 포지션 상태 바 */}
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {position.updateTime || "최근 업데이트"}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          isProfit
                            ? "bg-point/20 text-point"
                            : "bg-blue-500/20 text-blue-500"
                        }`}
                      >
                        {isProfit ? "수익 중" : "손실 중"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 요약 정보 */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="border border-gray-700 rounded-xl p-6 bg-background">
              <h4 className="text-gray-400 text-sm mb-2">총 포지션 수</h4>
              <p className="text-2xl font-bold">{positions.length}</p>
            </div>

            <div className="border border-gray-700 rounded-xl p-6 bg-background">
              <h4 className="text-gray-400 text-sm mb-2">총 미실현 손익</h4>
              <p
                className={`text-2xl font-bold ${
                  (positions as PositionItem[]).reduce(
                    (sum: number, pos: PositionItem) =>
                      sum + Number(pos.unrealisedPnl),
                    0,
                  ) >= 0
                    ? "text-point"
                    : "text-blue-500"
                }`}
              >
                {(positions as PositionItem[]).reduce(
                  (sum: number, pos: PositionItem) =>
                    sum + Number(pos.unrealisedPnl),
                  0,
                ) >= 0
                  ? "+"
                  : ""}
                {(positions as PositionItem[])
                  .reduce(
                    (sum: number, pos: PositionItem) =>
                      sum + Number(pos.unrealisedPnl),
                    0,
                  )
                  .toFixed(4)}{" "}
                USDT
              </p>
            </div>

            <div className="border border-gray-700 rounded-xl p-6 bg-background">
              <h4 className="text-gray-400 text-sm mb-2">총 유지증거금</h4>
              <p className="text-2xl font-bold">
                $
                {(positions as PositionItem[])
                  .reduce(
                    (sum: number, pos: PositionItem) =>
                      sum + Number(pos.margin),
                    0,
                  )
                  .toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
