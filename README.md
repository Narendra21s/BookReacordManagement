"# BookReacordManagement"

Server >> Storing certain book data >> Subscribe >> User Register

This is a book record management API Server / Backend for the library system or manuals or books

User : 14/04/24 - 14/07/24
Per day 50 fine,
17/07/24 => Fine, 150

## Subscription months

3 months (Basic)
6 months (Standard)
12 months (Premium)

If the subscription type is standard && if the Subscription data 14/04/24
=> then subscription valid till 14/10/24

within subscription date >> if we miss the renewal >> 50/- day
subscription data also missed >> and also missed the renewal >> 100 + 50/- day

missed by renewal date >> 50 /-
missed by subscription date >> 100/-
missed by renewal and subscription >> 100 + 50 = 150/-

#Routes and EndPoints

## /users

POST : Create a new user
GET :Get all the user infor here

## /users/{id}

GET : Get a user by passing id
PUT : Update a user by their id
DELETE : Delete a user by id (chk If he or she still have an issued book) && (is their any fine to paid)

## /users/subscription-details/{id}

GET : Get user subscription deatils >> Data of subscription >> Valid till >> Is their any fine

## /Books

GET : Get all the books
POST : Create / Add a new book

## /Books/id

GET : Geta book by id
PUT : Update a book by id

## /Books/issued

GET : Get all issued books

## /Books/issued/withFine

GET : Get all books by id

## npm init

## npm i nodemon
