export interface BybitBalanceResponse {
  retCode: number;
  retMsg: string;
  result: {
    list: Array<{
      totalEquity: string;
      totalWalletBalance: string;
      coin: Array<{
        coin: string;
        walletBalance: string;
      }>;
    }>;
  };
  exchangeRate: number; // 추가된 환율 필드
  time: number;
}
