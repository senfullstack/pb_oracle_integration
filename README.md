# Client Project`

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.5.

Run `npm i` first time for install the dependency packages.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. (Please upload the dist/*.* in your server)
==========================================================================================================
# Server Project`
## Development server

Run `npm i` first time for install the dependency packages.

Run `npm dev` for a dev server. Navigate to `http://localhost:3200/`. The application will automatically reload if you change any of the source files.

=============================================================================================================

## API 

1) Get Token - Receive oAuth Token
    URL : http://localhost:3002/getToken
    Method : POST
    Payload : {}

2) Reterive Products (created transaction#2100 and associated few articles(product))
    URL : http://localhost:3002/csh/v0/hotels/SAND01/transactionCodes?includeArticles=true&code=2100
    Method : GET

3) Search By Room ID and or Surname
    URL : http://localhost:3002/rsv/v1/hotels/SAND01/reservations?roomId=201&searchType=InHouse&surname=Benaim
    Mehtod : GET

4) Checkout / Add Charge
    URL : http://localhost:3002/csh/v0/hotels/SAND01/reservations/140978/charges
    Method: POST
    Payload: {"criteria":{"hotelId":"SAND01","charges":[{"transactionCode":"2100","articleCode":"2103","price":{"amount":5,"currencyCode":"USD"},"postingQuantity":1,"postingReference":"3 copy print","postingRemark":"3 copy print","checkNumber":"","applyRoutingInstructions":false,"usePackageAllowance":false,"autoPosting":true,"folioWindowNo":2,"cashierId":777}],"reservationId":{"id":"140978","idExtension":0},"incomeAuditDate":"2021-10-05","postIt":false,"cashierId":777,"welcomeOfferPosting":true}}

