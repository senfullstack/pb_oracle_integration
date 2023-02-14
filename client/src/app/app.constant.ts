import { Customer } from './app.model';

export const DefaultCustomer: Customer[] = [
  {
    givenName: 'Andy Goldfarb',
    surname: 'Goldfarb',
    reservationId: '140975',
    confomationId: '2273727',
    roomId: '101',
    arrival: '2023-02-13',
    depature: '2023-02-27',
  },
  {
    givenName: 'David Benaim',
    surname: 'Benaim',
    reservationId: '140978',
    confomationId: '2273727',
    roomId: '201',
    arrival: '2023-02-13',
    depature: '2023-02-25',
  },
  {
    givenName: 'Eswar Priyadarshan',
    surname: 'Priyadarshan',
    reservationId: '140979',
    confomationId: '2273903',
    roomId: '507',
    arrival: '2023-02-13',
    depature: '2023-02-25',
  },
  {
    givenName: 'Krishna Subbaraj',
    surname: 'Subbaraj',
    reservationId: '140980',
    confomationId: '203118',
    roomId: '1000',
    arrival: '2023-02-13',
    depature: '2023-02-27',
  },
];

export const HotelId = 'SAND01';
export const transactionCodes = '2100';
export const cashierId = 777;
export const URI = {
  token: 'getToken',
  products: `csh/v0/hotels/${HotelId}/transactionCodes?includeArticles=true&code=${transactionCodes}`,
};
