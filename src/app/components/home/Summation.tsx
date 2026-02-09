"use client";

import { useGetMoney } from "../../hooks/useGetMoney";
import { usegetEthPrice } from "../../hooks/usegetEthPrice";

export const Summation = () => {
  const { data, loading: moneyLoading, error: moneyError } = useGetMoney();

  const {
    data: ethPriceData,
    loading: ethPriceLoading,
    error: ethPriceError,
  } = usegetEthPrice();

  console.log("ethPriceData >>> ", ethPriceData);

  // 1. 로딩 상태 통합 개선: 둘 중 하나라도 로딩 중이되, 데이터가 아직 없을 때만 로딩 표시
  // 데이터가 하나라도 왔다면 화면 깜빡임 방지를 위해 로딩을 무시하고 렌더링을 시도합니다.
  const isInitialLoading =
    (moneyLoading || ethPriceLoading) && (!data || !ethPriceData);
  console.log("isInitialLoading >>> ", isInitialLoading);
  if (isInitialLoading) return <div>데이터 불러오는 중...</div>;

  // 에러 처리
  if (moneyError || ethPriceError)
    return <div>에러 발생: {moneyError || ethPriceError}</div>;

  const balanceInfo = data?.result?.list?.[0];
  const ethPrice = ethPriceData?.result?.[0]?.lastPrice;
  console.log("ethPrice >>", ethPrice);
  // 데이터가 없을 경우를 대비한 안전한 처리
  if (!balanceInfo) {
    return (
      <div className="space-y-6">
        <div className="w-full space-y-4">
          <h1 className="text-2xl lg:text-2xl font-bold">총 자산</h1>
          <div className="flex justify-center items-center p-8 border border-point rounded-xl bg-background">
            <p className="text-gray-500">데이터를 불러올 수 없습니다</p>
          </div>
        </div>
      </div>
    );
  }

  const rate = data?.exchangeRate || 1350;
  const totalEquityUSD = Number(balanceInfo?.totalEquity || 0);
  const totalKRW = (totalEquityUSD * rate).toLocaleString(undefined, {
    maximumFractionDigits: 0,
  });

  return (
    <div className="space-y-6">
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
                  {Number(
                    balanceInfo?.totalWalletBalance || 0,
                  ).toLocaleString()}{" "}
                  <span className="text-xs text-gray-500">USDT</span>
                </h1>
                <h1 className="text-xl lg:text-2xl font-semibold text-point">
                  {(
                    Number(balanceInfo?.totalWalletBalance || 0) * rate
                  ).toLocaleString(undefined, {
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
                  {Number(
                    balanceInfo?.coin?.[0]?.walletBalance || 0,
                  ).toLocaleString()}{" "}
                  <span className="text-xs text-gray-500">USDT</span>
                </h1>
                <h1 className="text-xl lg:text-2xl font-semibold text-point">
                  {(
                    Number(balanceInfo?.coin?.[0]?.walletBalance || 0) * rate
                  ).toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}{" "}
                  <span className="text-sm font-normal">원</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 이더리움 정보 섹션 */}
      <div>
        <h1 className="text-l font-bold">ETHUSDT</h1>
        <div className="flex flex-wrap">
          <div className="py-2 w-1/2">
            <p>현재가 : </p>
            <h1 className="text-point text-3xl">
              {Number(ethPrice).toLocaleString()}
            </h1>
          </div>

          <div className="py-2 w-1/2">
            <p>수익률 : </p>
            <h1 className="text-point text-3xl">8%</h1>
          </div>
          {/* 나머지 수익률 칸들 유지... */}
        </div>
      </div>

      {/* 비트코인 섹션 (필요시 동일하게 추가) */}
      <div>
        <h1 className="text-l font-bold">BITCOIN</h1>
        <div className="flex flex-wrap">
          <div className="py-2 w-1/2">
            <p>현재가 : </p>
            <h1 className="text-point text-3xl">준비중</h1>
          </div>
          <div className="py-2 w-1/2">
            <p>수익률 : </p>
            <h1 className="text-point text-3xl">-%</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
