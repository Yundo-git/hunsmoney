"use client";

import { useGetMoney } from "../../hooks/useGetMoney";
import { usegetEthPrice } from "../../hooks/usegetEthPrice";
import { TotalAssets } from "./TotalAssets";
import { CryptoInfo } from "./CryptoInfo";

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
  const ethPriceKRW = (Number(ethPrice) * rate).toLocaleString(undefined, {
    maximumFractionDigits: 0,
  });

  console.log(ethPriceKRW);

  return (
    <div className="space-y-6">
      <TotalAssets
        totalEquityUSD={totalEquityUSD}
        totalKRW={totalKRW}
        totalWalletBalance={Number(balanceInfo?.totalWalletBalance || 0)}
        availableBalance={Number(balanceInfo?.coin?.[0]?.walletBalance || 0)}
        rate={rate}
      />

      {/* 이더리움 정보 섹션 */}
      <CryptoInfo
        symbol="ETHUSDT"
        currentPriceKRW={ethPriceKRW}
        profitRate="8%"
      />

      {/* 비트코인 섹션 */}
      <CryptoInfo symbol="BITCOIN" profitRate="-%" />
    </div>
  );
};
