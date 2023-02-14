import { Products } from "../app.model";

export const DefaultProducts: Products = {
  trxCodes: [
    {
      description: 'Photo Butler Products',
      articles: [
        {
          description: '1 copy print',
          price: {
            amount: 2,
          },
          postIt: {
            availableForPostIt: true,
          },
          articleCode: '2101',
        },
        {
          description: '3 copy print',
          price: {
            amount: 5,
          },
          postIt: {
            availableForPostIt: true,
          },
          articleCode: '2103',
        },
        {
          description: '5 copy print',
          price: {
            amount: 7,
          },
          postIt: {
            availableForPostIt: true,
          },
          articleCode: '2105',
        },
        {
          description: '10 copy print',
          price: {
            amount: 10,
          },
          postIt: {
            availableForPostIt: true,
          },
          articleCode: '2110',
        },
        {
          description: '20 copy print',
          price: {
            amount: 18,
          },
          postIt: {
            availableForPostIt: true,
          },
          articleCode: '01',
        },
      ],
      trxServiceType: 'S',
      transactionCode: '2100',
      hotelId: 'SAND01',
      printTrxReceipt: false,
    },
  ],
  links: [],
};

