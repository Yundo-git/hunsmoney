export interface PositionItem {
  symbol: string;
  side: "Buy" | "Sell";
  size: string;
  entryPrice: string;
  markPrice: string;
  unrealisedPnl: string;
  percentage: string;
  leverage: string;
  margin: string;
  updateTime?: string;
}

export interface PositionResponse {
  retCode: number;
  retMsg: string;
  result: {
    list: PositionItem[];
  };
  time: number;
}
