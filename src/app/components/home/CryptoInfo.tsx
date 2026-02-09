"use client";

interface CryptoInfoProps {
  symbol: string;
  currentPrice?: string;
  currentPriceKRW?: string;
  profitRate?: string;
}

export const CryptoInfo = ({
  symbol,
  currentPrice,
  currentPriceKRW,
  profitRate,
}: CryptoInfoProps) => {
  return (
    <div>
      <h1 className="text-l font-bold">{symbol}</h1>
      <div className="flex flex-wrap">
        <div className="py-2 w-1/2">
          <p>현재가 : </p>
          <h1 className="text-point text-3xl">
            {currentPriceKRW || "준비중"}
          </h1>
        </div>

        <div className="py-2 w-1/2">
          <p>수익률 : </p>
          <h1 className="text-point text-3xl">{profitRate || "-%"}</h1>
        </div>
      </div>
    </div>
  );
};
