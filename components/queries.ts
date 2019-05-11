import gql from "graphql-tag";
import ApolloClient from "apollo-boost";


export const RESERVATIONS_QUERY = gql`
  query {
    reservations(
      where: {name_not: ""},
      orderBy: createdAt_DESC) {
        id
        name
        hotelName
        departureDate
        arrivalDate
    }
  }
`

export const ADD_RESERVATION_QUERY = gql`
  mutation addReservation($name: String!, $hotelName: String!, $arrivalDate: String!, $departureDate: String!) {
    createReservation(data: {name: $name, hotelName: $hotelName, arrivalDate: $arrivalDate, departureDate: $departureDate}) {
      id
    }
  }
`

export const client = new ApolloClient({
  uri: 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev'
})

