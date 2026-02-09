"use client";

interface CryptoInfoProps {
  symbol: string;
  currentPrice?: string; // 달러 현재가
  currentPriceKRW?: string; // 원화 현재가
  profitRate?: string; // 수익률 (%)
  pnl?: string; // 수익금 (USDT)
  hasPosition?: boolean; // 포지션 보유 여부
}

export const CryptoInfo = ({
  symbol,
  currentPrice,
  currentPriceKRW,
  profitRate,
  pnl,
  hasPosition,
}: CryptoInfoProps) => {
  // 수익률 숫자에 따라 색상을 결정하는 로직 (양수: point색상, 음수: 파란색, 기본: 회색)
  const getRateColor = () => {
    if (!hasPosition) return "text-gray-500";
    const rate = parseFloat(profitRate || "0");
    if (rate > 0) return "text-point"; // 보통 커스텀 컬러인 point (빨간색 계열)
    if (rate < 0) return "text-blue-500";
    return "text-gray-400";
  };

  return (
    <div className="border-t border-gray-800 pt-4 mt-4">
      <h1 className="text-l font-bold mb-2">{symbol}</h1>
      <div className="flex flex-wrap">
        {/* 1. 현재가 (원화/달러) */}
        <div className="py-2 w-1/2">
          <p className="text-sm text-gray-400">현재가 (KRW)</p>
          <h1 className="text-point text-2xl font-bold">
            {currentPriceKRW ? `${currentPriceKRW} 원` : "준비중"}
          </h1>
          <p className="text-xl text-gray-500">${currentPrice || "0.00"}</p>
        </div>

        {/* 2. 수익률 */}
        <div className="py-2 w-1/2">
          <p className="text-sm text-gray-400">수익률</p>
          <h1 className={`${getRateColor()} text-3xl text-point font-bold`}>
            {hasPosition ? profitRate : "보유 안함"}
          </h1>
        </div>

        {/* 3. 수익금 (포지션이 있을 때만 강조해서 표시) */}
        <div className="py-2 w-1/2">
          <p className="text-sm text-gray-400">미실현 손익</p>
          <h1 className={`${getRateColor()} text-2xl text-point font-bold`}>
            {hasPosition ? `${pnl} USDT` : "0.00"}
          </h1>
        </div>

        {/* 4. 상태 표시 */}
        <div className="py-2 w-1/2 flex items-end">
          <span
            className={`text-xs px-2 py-1 rounded ${hasPosition ? "bg-point/20 text-point" : "bg-gray-800 text-point"}`}
          >
            {hasPosition ? "거래 중" : "구경 중"}
          </span>
        </div>
      </div>
    </div>
  );
};
