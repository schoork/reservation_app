# GOTHotels.com

A small app that lists reservations from a GraphQL backend and allows users to add a reservation.

This app was tested on an iOS Simulator.

For flair, the name of the hotel determines the house sigil for an avatar on the ListPage and determines Tyrion's message to the user before submitting the reservation on the AddReservation page. Error on submitting is handled by the cold demeanor of a former Lord Commander who has no time for games.

## Backend

The app utilizes a [GraphQL backend](https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev). The app uses a *reservations* query on **components/ListPage.tsx** and *createReservation* mutation to add the reservation to the database. The *reservations* query is also passed to the AddReservation.

## Components

The app is staged from **App.tsx** with a Stack Navigator. Because I wanted the add button to be in the header (and thus not block the view of any reservations), the link is located in **App.tsx**.

There are two main components, one for each of screen of the app.
+ components/ListPage.tsx - lists the reservations
+ components/AddReservation.tsx - allows user to add a new reservation

### components/ListPage.tsx

This page is rendered within an Apollo Provider to display the list of reservations. The list is displayed as a FlatList with avatar, title, and subtitle so that all of the information of the reservation is available in the list. 

Currently, the list does not run every time a reservation is added to the database, but it does re-run after a user creates a new reservation.

### components/AddReservation.tsx

The navigation link to **components/AddReservation.tsx page** is located in **App.tsx**. This is because I wanted the add button to be out of the way of any information from the reservations list.

The page has a main view with a form and two modals that appear based on the information submitted in the form. 

The form requires a name, hotel name, arrival date, and departure date. The arrival date defaults to the current day and the departure date defaults to the next day. Clicking on either will bring up an iOS style picker to select a new date.

If the user submits the form without a name or hotel name, they will be confronted with the cold glare of a not very happy Jon Snow who reminds them about the necessity of these things. The visibility of this modal is controlled by the boolean *errorModalVisible*.

Once the user has entered the required data and clicked the complete button, Tyrion Lannister gives them one final warning about the place they are visiting. Clicking *No* returns them to the form. Clicking *Yes* submits the form data to the database and returns the user to the reservations list. The visibility of this modal is controlled by the boolean *modalVisible*.

One thing I would like to add in the future is an interactive map of Westeros that the user can click to select the hotel. The house sigil and warning would then be based on where on the map the user clicked, rather than the name of the hotel.