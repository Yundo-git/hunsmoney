"use client";

interface TotalAssetsProps {
  totalEquityUSD: number;
  totalKRW: string;
  totalWalletBalance: number;
  availableBalance: number;
  rate: number;
}

export const TotalAssets = ({
  totalEquityUSD,
  totalKRW,
  totalWalletBalance,
  availableBalance,
  rate,
}: TotalAssetsProps) => {
  return (
    <div className="space-y-6">
      <div className="w-full space-y-4">
        <h1 className="text-2xl lg:text-2xl font-bold">총 자산</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 w-full border border-point shadow-lg hover:shadow-xl p-5 lg:p-8 rounded-xl bg-background gap-6 lg:gap-8 transition-all">
          {/* 1. 총 자산 */}
          <div className="flex justify-between lg:flex-col lg:justify-center space-y-1 border-b lg:border-b-0 lg:border-r border-gray-800 pb-4 lg:pb-0">
            <p className="text-xl lg:text-base text-gray-400">
              현금 + 코인 합계
            </p>
            <div className="space-y-1">
              <h1 className="text-2xl lg:text-3xl font-bold">
                {totalEquityUSD.toLocaleString()}{" "}
                <span className="text-sm font-normal text-gray-500">
                  USDT
                </span>
              </h1>
              <h1 className="text-xl lg:text-2xl font-semibold text-point">
                {totalKRW} <span className="text-sm font-normal">원</span>
              </h1>
            </div>
          </div>

          {/* 2. 지갑 잔액 */}
          <div className="flex justify-between lg:flex-col lg:justify-center space-y-1 border-b lg:border-b-0 lg:border-r border-gray-800 pb-4 lg:pb-0">
            <p className="text-xl lg:text-base text-gray-400">지갑 잔액</p>
            <div className="space-y-1">
              <h1 className="text-2xl lg:text-3xl font-bold">
                {totalWalletBalance.toLocaleString()}{" "}
                <span className="text-xs text-gray-500">USDT</span>
              </h1>
              <h1 className="text-xl lg:text-2xl font-semibold text-point">
                {(totalWalletBalance * rate).toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}{" "}
                <span className="text-sm font-normal">원</span>
              </h1>
            </div>
          </div>

          {/* 3. 사용 가능 잔액 */}
          <div className="flex justify-between lg:flex-col lg:justify-center space-y-1">
            <p className="text-xl lg:text-base text-gray-400">
              사용 가능 잔액
            </p>
            <div className="space-y-1">
              <h1 className="text-2xl lg:text-3xl font-bold">
                {availableBalance.toLocaleString()}{" "}
                <span className="text-xs text-gray-500">USDT</span>
              </h1>
              <h1 className="text-xl lg:text-2xl font-semibold text-point">
                {(availableBalance * rate).toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}{" "}
                <span className="text-sm font-normal">원</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
