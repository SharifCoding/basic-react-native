import React from 'react'
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// https://reactnavigation.org/
import { StackNavigator } from 'react-navigation'

// mocking all venues
const venues = [
  {
    id: 1,
    name: "Austin Convention Center",
    address: "500 E Cesar Chavez",
    imageUrl: "https://res.cloudinary.com/simpleview/image/upload/c_fill,f_auto,h_240,q_75,w_300/v1/clients/austin/Austin_Convention_Center_Photo_Credit_Thomas_McConnell_Full_Usage_Permissions_5__7e33dc59-1b4c-4de9-9044-c9d18041cca9.jpg"
  },
  {
    id: 2,
    name: "JW Marriott",
    address: "110 E 2nd St",
    imageUrl: "https://wa2.jetcdn.com/photos/jw-marriott-austin/5vOE_FjZ/architecture-city-downtown-building.jpeg?w=780&h=520&dpr=1"
  },
  {
    id: 3,
    name: "Westin Austin Downtown",
    address: "310 E 5th St",
    imageUrl: "http://www.starwoodhotels.com/pub/media/3899/wes3899po.214266_md.jpg"
  },
  {
    id: 4,
    name: "Hilton Austin Downtown",
    address: "500 E 4th St",
    imageUrl: "http://momvoyage.hilton.com/wp-content/uploads/2014/10/Best-Downtown-Austin-Hotels-Hilton-Austin-e1413228104466-940x564.jpg"
  },
  {
    id: 5,
    name: "The Driskill",
    address: "604 Brazos St",
    imageUrl: "https://assets.hospitalityonline.com/photos/employers/258110/404068_l.jpg"
  }
]

// function to find and return venue.id
function findVenue(navigation) {
  let { params } = navigation.state
  let id = params ? params.id : null
  return venues.find((venue) => venue.id === id)
}

// initial home screen when app launched
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Venues',
  }

  // list all venue mocked
  venueList() {
    return venues.map((venue) => {
      return (
        <TouchableOpacity key={venue.id} style={styles.row} onPress={() => this.props.navigation.navigate('Details', { id: venue.id })}>
          <Text style={styles.rowText}>{ venue.name }</Text>
        </TouchableOpacity>
      )
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          { this.venueList() }
        </View>
      </View>
    )
  }
}

// venue detailed screen opens once venue selected
class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    let venue = findVenue(navigation)

    return {
      title: venue ? venue.name : "Somewhere",
    }
  }

  render() {
    let venue = findVenue(this.props.navigation)

    return (
      <View style={[styles.container, styles.detailPage]}>
        <Text style={styles.venueName}>{ venue.name }</Text>
        <Text style={styles.address}>{ venue.address }</Text>
        <Image
          style={styles.image}
          source={{uri: venue.imageUrl}}
        />

        <Button
          color="#e47154"
          title="Back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    )
  }
}

// React Navigation is built around the concept of the navigation stack
// https://reactnavigation.org/docs/en/hello-react-navigation.html
const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    }
  },
  {
    initialRouteName: 'Home',
  }
);

// `createStackNavigator` function returns a React component
// exported directly from App.js to be used as App's root component
export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#1F439B',
    flex: 1,
    justifyContent: 'center',
  },
  detailPage: {
    backgroundColor: '#1F439B',
  },
  row: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginBottom: 10,
    padding: 20,
  },
  rowText: {
    color: '#000',
    fontWeight: '700',
  },
  venueName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  address: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#eee'
  },
  image: {
    borderRadius: 5,
    height: 200,
    margin: 25,
    width: 200,
  },
});
