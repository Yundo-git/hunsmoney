"use client";

import { useGetMoney } from "../../hooks/useGetMoney";

export const Summation = () => {
  const { data, loading, error, refetch } = useGetMoney();
  if (loading) return <div>데이터 불러오는 중...</div>;
  if (error) return <div>에러: {error}</div>;
  const balanceInfo = data?.result.list[0];

  console.log(" balanceInfo >>> ", balanceInfo);

  const rate = data?.exchangeRate || 1350; // API 실패 시 대비용 기본값 설정

  const totalEquityUSD = Number(balanceInfo?.totalEquity || 0);
  const totalKRW = (totalEquityUSD * rate).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <div className="w-full space-y-4">
          <h1 className="text-2xl lg:text-2xl font-bold">총 자산</h1>

          {/* 메인 카드: 모바일에서는 세로, 데스크톱에서는 3컬러 그리드 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 w-full border border-point shadow-lg hover:shadow-xl p-5 lg:p-8 rounded-xl bg-background gap-6 lg:gap-8 transition-all">
            {/* 1. 총 자산 (현금 + 코인) - 가장 강조 */}
            <div className="flex justify-between lg:flex-col lg:justify-center space-y-1 border-b lg:border-b-0 lg:border-r border-gray-800 pb-4 lg:pb-0">
              <p className="text-xl lg:text-base text-gray-400">
                현금 + 코인 합계
              </p>
              <div className="space-y-1">
                <h1 className="text-2xl lg:text-3xl font-bold">
                  {Number(balanceInfo?.totalEquity).toLocaleString()}{" "}
                  <span className="text-sm font-normal text-gray-500">
                    USDT
                  </span>
                </h1>
                <h1 className="text-xl lg:text-2xl font-semibold text-point">
                  {totalKRW.toLocaleString()}{" "}
                  <span className="text-sm font-normal">원</span>
                </h1>
              </div>
            </div>

            {/* 2. 지갑 잔액 */}
            <div className="flex justify-between lg:flex-col lg:justify-center space-y-1 border-b lg:border-b-0 lg:border-r border-gray-800 pb-4 lg:pb-0">
              <p className="text-xl lg:text-base text-gray-400">지갑 잔액</p>
              <div className="space-y-1">
                <h1 className="text-2xl lg:text-3xl font-bold">
                  {Number(balanceInfo?.totalWalletBalance).toLocaleString()}{" "}
                  <span className="text-xs text-gray-500">USDT</span>
                </h1>
                <h1 className="text-xl lg:text-2xl font-semibold text-point">
                  {(
                    Number(balanceInfo?.totalWalletBalance || 0) * rate
                  ).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
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
                  {Number(balanceInfo?.coin[0].walletBalance).toLocaleString()}{" "}
                  <span className="text-xs text-gray-500">USDT</span>
                </h1>
                <h1 className="text-xl lg:text-2xl font-semibold text-point">
                  {(
                    Number(balanceInfo?.coin[0].walletBalance || 0) * rate
                  ).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}{" "}
                  <span className="text-sm font-normal">원</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-l">ETHUSDT</h1>
        <div className="flex flex-wrap">
          <div className="py-2 w-1/2">
            <p>현재가 : </p>
            <h1 className="text-point text-3xl">10000</h1>
          </div>

          <div className="py-2 w-1/2">
            <p>수익률 : </p>
            <h1 className="text-point text-3xl">8%</h1>
          </div>

          <div className="py-2 w-1/2">
            <p>수익률 : </p>
            <h1 className="text-point text-3xl">8%</h1>
          </div>

          <div className="py-2 w-1/2">
            <p>수익률 : </p>
            <h1 className="text-point text-3xl">8%</h1>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-l">BITCOIN</h1>
        <div className="flex flex-wrap">
          <div className="py-2 w-1/2">
            <p>현재가 : </p>
            <h1 className="text-point text-3xl">10000</h1>
          </div>

          <div className="py-2 w-1/2">
            <p>수익률 : </p>
            <h1 className="text-point text-3xl">8%</h1>
          </div>

          <div className="py-2 w-1/2">
            <p>수익률 : </p>
            <h1 className="text-point text-3xl">8%</h1>
          </div>

          <div className="py-2 w-1/2">
            <p>수익률 : </p>
            <h1 className="text-point text-3xl">8%</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
