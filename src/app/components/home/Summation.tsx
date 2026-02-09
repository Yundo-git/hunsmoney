"use client";

import { useGetMoney } from "../../hooks/useGetMoney";
import { usegetEthPrice } from "../../hooks/usegetEthPrice";
import { TotalAssets } from "./TotalAssets";
import { CryptoInfo } from "./CryptoInfo";
import { useGetPosition } from "../../hooks/useGetPosition";
import { useGetTradeHistory } from "../../hooks/useGetTradeHistory";
import { CryptoInfoHistory } from "./CryptoInfoHistory";

export const Summation = () => {
  // 1. 모든 데이터 Hook 호출
  const {
    data: balanceData,
    loading: moneyLoading,
    error: moneyError,
  } = useGetMoney();
  const {
    data: ethPriceData,
    loading: ethPriceLoading,
    error: ethPriceError,
  } = usegetEthPrice();
  const {
    data: ethPositionData,
    loading: ethPositionLoading,
    error: ethPositionError,
  } = useGetPosition("ETHUSDT");

  const {
    data: ethTradeHistoryData,
    loading: ethTradeHistoryLoading,
    error: ethTradeHistoryError,
  } = useGetTradeHistory("ETHUSDT");

  // 2. 통합 로딩 상태 관리
  // 초기 데이터가 하나라도 없는 상태에서 로딩 중이라면 로딩 화면 표시
  const isInitialLoading =
    (moneyLoading ||
      ethPriceLoading ||
      ethPositionLoading ||
      ethTradeHistoryLoading) &&
    (!balanceData || !ethPriceData || !ethPositionData || !ethTradeHistoryData);

  if (isInitialLoading)
    return <div className="p-8 text-center">데이터를 동기화 중입니다...</div>;

  // 3. 에러 처리
  if (moneyError || ethPriceError || ethPositionError || ethTradeHistoryError) {
    return (
      <div className="p-8 text-red-500 border border-red-900 rounded-xl">
        에러 발생:{" "}
        {moneyError ||
          ethPriceError ||
          ethPositionError ||
          ethTradeHistoryError}
      </div>
    );
  }

  // 4. 데이터 가공 (Optional Chaining 활용)
  const balanceInfo = balanceData?.result?.list?.[0];
  const rate = balanceData?.exchangeRate || 1350;

  // 이더리움 현재가 (Bybit V5 구조: result.list[0].lastPrice)
  const ethCurrentPrice = ethPriceData?.result?.[0]?.lastPrice || "0";

  // 포지션 데이터 가공
  const hasEthPosition = ethPositionData?.hasPosition || false;
  const ethROE = hasEthPosition ? `${ethPositionData?.data?.roe}%` : "0%";
  const ethPnl = hasEthPosition
    ? `${Number(ethPositionData?.data?.unrealisedPnl).toFixed(2)}`
    : "0";

  // 화폐 환산
  const totalEquityUSD = Number(balanceInfo?.totalEquity || 0);
  const totalKRW = (totalEquityUSD * rate).toLocaleString(undefined, {
    maximumFractionDigits: 0,
  });
  const ethPriceKRW = (Number(ethCurrentPrice) * rate).toLocaleString(
    undefined,
    { maximumFractionDigits: 0 },
  );

  return (
    <div className="space-y-6">
      {/* 총 자산 카드 섹션 */}
      <TotalAssets
        totalEquityUSD={totalEquityUSD}
        totalKRW={totalKRW}
        totalWalletBalance={Number(balanceInfo?.totalWalletBalance || 0)}
        availableBalance={Number(balanceInfo?.coin?.[0]?.walletBalance || 0)}
        rate={rate}
      />

      {/* 이더리움 실시간 정보 및 수익률 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CryptoInfo
          symbol="ETHUSDT"
          currentPrice={Number(ethCurrentPrice).toLocaleString()}
          currentPriceKRW={ethPriceKRW}
          profitRate={ethROE}
          pnl={ethPnl}
          hasPosition={hasEthPosition}
        />
        <CryptoInfoHistory
          history={ethTradeHistoryData?.data || []}
          loading={ethTradeHistoryLoading}
        />

        {/* 비트코인 섹션 (추후 비트코인용 Hook 추가 시 동일하게 연결) */}
        <CryptoInfo
          symbol="BTCUSDT"
          currentPrice="-"
          currentPriceKRW="-"
          profitRate="-%"
          // hasPosition={false}
        />
      </div>
    </div>
  );
};
