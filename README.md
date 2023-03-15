# Stock Trading App

App built with React (frontend), Express (backend), pgAdmin (DB) that pulls stock data from this [FMP API](https://site.financialmodelingprep.com/developer/docs/).

View Application on [Heroku](https://naamp-stock-trading.herokuapp.com/)

#### Landing Page
<img src="https://user-images.githubusercontent.com/53867191/132024927-5811a580-962b-4912-bb3f-daca692a7b91.png" />

#### Dashboard
<img src="https://user-images.githubusercontent.com/53867191/132025287-7bc2e297-8d25-4a64-a568-5d83899a2adf.png" />

#### Trading Pages
<img src="https://user-images.githubusercontent.com/53867191/132025447-6626dec9-5ec6-4d96-99be-3c7d0fb7afb2.png" />

## Summary

#### App functionality
-	The front end displays the UI and send the request back and forth to the back end. I also utilized a Google chart to visualize the stock price and the portfolio value. 
-	The backend breaks into 
    1.	Routes: Server.js incorporated all the routes.
    2.	Controllers and services: Each route has its controller and service to organize and validate all the logic and transactions.
    3.	Database: All data gets saved in the database. I also use drawSQL to visualize the DB relationships.

#### App Flow/Routes
- Auth route manages the signup, login and logout process. 
- CashTransfer route: A new user starts with a zero cash balance, they need to initial the cash transfer to start trading. All cash transfer transactions will be reflected here.
- CashBalance route: the cash balance will be updated when cash gets transferred into the account.
- Stock route: The user can look up the stock name or the stock symbol in the top navbar. Once an option has been selected, the user will be navigated to the stock page.
- Order route reflects all buy and sell transactions. 
- Transaction route is used to validate all buy and sell transactions.
- Currentholding route is used to display all the stocks the user holds.

#### Takeaways

This is my second full-stack application and first time implementing unit testing. I have learned a ton. The most significant one is how to simplify my code by breaking them into modules so that I can organize my code better, making it more readable, testable, and controllable. This project is definitely challenging. I got to work through bugs and problems and figured out why the code did not work the way it is supposed to. I was enjoying the process of learning and making the application work. In the end, I was able to complete it and it was an extremely rewarding experience. I look forward to learning and creating new projects to be a better software developer. :)


## Built With

- Environment - [NodeJs](https://nodejs.org/en/)
- Frontend - [ReactJs](https://reactjs.org/) + [Bootstrap](https://getbootstrap.com/) & [Reactstrap](https://reactstrap.github.io/)
- Backend - [ExpressJs](https://expressjs.com/)
- Database - [pgAdmin](https://www.pgadmin.org/)

## Deployment

- [Heroku](https://www.heroku.com)

## Installation
1. Run `npm install` in root folder
2. Run `npm install --prefix client` in root folder
3. Create `.env` file in the root directory and set the following environment variables
   1. DB variables - This can be set up pretty quickly using [ElephantSQL](https://www.elephantsql.com/).
      - `DB_DATABASE`
      - `DB_HOST`
      - `DB_PASSWORD`
      - `DB_PORT`
      - `DB_USER`
      - Connect to the ElephantSQL server on pgAdmin and then create new query and run the script from `db.sql` file
   2. `apikey` - You can signup and get a free API key from this [site](https://site.financialmodelingprep.com/developer/docs/).
   3. `ACCESS_TOKEN_SECRET` - this can be created using this [site](https://www.javainuse.com/jwtgenerator).
4. Run `npm run dev` to start server
5. Open browser at `http://localhost:5000`

## Author

- Naam Pondpat - _Full Stack Software Developer_ - [LinkedIn](https://www.linkedin.com/in/naam-pondpat-638153150/)

