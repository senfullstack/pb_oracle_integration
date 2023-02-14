export type Article = {
  description: string;
  price: {
    amount: number;
  };
  postIt: {
    availableForPostIt: boolean;
  };
  articleCode: string;
};

export type TrxCode = {
  description: string;
  articles: Article[];
  trxServiceType: string;
  transactionCode: string;
  hotelId: string;
  printTrxReceipt: boolean;
};

export type Products = {
  trxCodes: TrxCode[];
  links: never[];
};

export type Customer = {
  givenName: string;
  surname: string;
  reservationId: string;
  confomationId: string;
  roomId: string;
  arrival: string;
  depature: string;
};

