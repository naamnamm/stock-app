# Stock Trading App

App built with React (frontend), Express (backend), pgAdmin (DB) that pulls stock data from [IEX API](https://iexcloud.io/docs/api/).

View Application on [Heroku](https://naamp-stock-trading.herokuapp.com/)

Landing Page
<img src="https://user-images.githubusercontent.com/53867191/132024927-5811a580-962b-4912-bb3f-daca692a7b91.png" />

Dashboard
<img src="https://user-images.githubusercontent.com/53867191/132025287-7bc2e297-8d25-4a64-a568-5d83899a2adf.png" />

Trading Pages
<img src="https://user-images.githubusercontent.com/53867191/132025447-6626dec9-5ec6-4d96-99be-3c7d0fb7afb2.png" />

## Summary

#### App functionality
-	The frontend display the UI and send the request back and forth to the back end. I also utilized google chart to visualize the stock price and the portfolio holding value. 
-	The backend breaks into 
    1.	Routes: Server.js incorporated all different routes.
    2.	Controller and services: Each route have its own controller and services to organize and validate all the logic and transactions
    3.	Database: All data gets saved in the database. The back end essentially pull information from the db and send it back to display it. I also use drawSQL to visualize the db relationships.


#### Takeaways

This is my second full-stack application and first time implementing unit testing. I have learned a ton. The most significant one is how to simplify my code by breaking them into modules so that I can organize my code better, making more readable, testable, and controllable. This project is definitely challenging. I get to work through bugs and problems and figure out why the code does not work the way it is supposed to. I was enjoying the process of learning and making the application work. In the end, I was able to complete it and it was an extremely rewarding experience. I look forward to learning and creating new projects to be a better software developer.


## Built With

- Environment - [NodeJs](https://nodejs.org/en/)
- Frontend - [ReactJs](https://reactjs.org/) + [Bootstrap](https://getbootstrap.com/) & [Reactstrap](https://reactstrap.github.io/)
- Backend - [ExpressJs](https://expressjs.com/)
- Database - [pgAdmin](https://www.pgadmin.org/)

## Deployment

- [Heroku](https://www.heroku.com)

## Author

- Naam Pondpat - _Full Stack Software Developer_ - [LinkedIn](https://www.linkedin.com/in/naam-pondpat-638153150/)

