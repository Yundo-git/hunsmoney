// types/ethPrice.ts
export interface EthPriceResponse {
  retCode: number;
  retMsg: string;
  result: [
    {
      symbol: string;
      lastPrice: string;
      volume: string;
      turnover: string;
    },
  ];
  retExtInfo: object;
  time: number;
}
