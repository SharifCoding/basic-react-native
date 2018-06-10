import React from 'react'
import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { StackNavigator } from 'react-navigation'

const venues = [
  {
    id: 1,
    name: "Austin Convention Center",
    address: "500 E Cesar Chavez",
    imageUrl: "https://res.cloudinary.com/simpleview/image/upload/c_fill,f_auto,h_240,q_75,w_300/v1/clients/austin/Austin_Convention_Center_Photo_Credit_Thomas_McConnell_Full_Usage_Permissions_5__7e33dc59-1b4c-4de9-9044-c9d18041cca9.jpg",
    latitude: "30.263569",
    longitude: "-97.739606"
  },
  {
    id: 2,
    name: "JW Marriott",
    address: "110 E 2nd St",
    imageUrl: "https://wa2.jetcdn.com/photos/jw-marriott-austin/5vOE_FjZ/architecture-city-downtown-building.jpeg?w=780&h=520&dpr=1",
    latitude: "30.264509",
    longitude: "-97.743470"
  },
  {
    id: 3,
    name: "Westin Austin Downtown",
    address: "310 E 5th St",
    imageUrl: "http://www.starwoodhotels.com/pub/media/3899/wes3899po.214266_md.jpg",
    latitude: "30.266620",
    longitude: "-97.740375"
  },
  {
    id: 4,
    name: "Hilton Austin Downtown",
    address: "500 E 4th St",
    imageUrl: "http://momvoyage.hilton.com/wp-content/uploads/2014/10/Best-Downtown-Austin-Hotels-Hilton-Austin-e1413228104466-940x564.jpg",
    latitude: "30.265259",
    longitude: "-97.738290"
  },
  {
    id: 5,
    name: "The Driskill",
    address: "604 Brazos St",
    imageUrl: "https://assets.hospitalityonline.com/photos/employers/258110/404068_l.jpg",
    latitude: "30.268538",
    longitude: "-97.741633"
  }
]

// Distance Calculation - calculate the distance between two lat/longs in miles
function distance(lat1, lon1, lat2, lon2) {
	var φ1 = Math.PI * lat1/180
	var φ2 = Math.PI * lat2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(radtheta)
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	return dist.toFixed(2)
}

function findVenue(navigation) {
  let { params } = navigation.state
  let id = params ? params.id : null
  return venues.find((venue) => venue.id === id)
}

function distanceSort(a,b) {
  return (a.distance && b.distance) ? a.distance - b.distance : 0
}

function venuesWithDistance(lat, lon) {
  if (!lat || !lon) return venues

  return venues.map((venue) => {
    return {
      distance: distance(venue.latitude, venue.longitude, lat, lon),
      ...venue
    }
  }).sort(distanceSort)
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Venues',
  }

  venueList() {
    return venuesWithDistance(this.props.screenProps.latitude, this.props.screenProps.longitude).map((venue) => {
      return (
        <TouchableOpacity key={venue.id} style={styles.row} onPress={() => this.props.navigation.navigate('Details', { id: venue.id })}>
          <Text style={styles.rowText}>{ venue.name }</Text>
          <Text style={styles.distance}>{ venue.distance ? `${venue.distance} miles away` : 'Unknown distance away' }</Text>
        </TouchableOpacity>
      )
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          { this.venueList() }
        </ScrollView>
      </View>
    )
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    let venue = findVenue(navigation)

    return {
      title: venue ? venue.name : "Somewhere",
    }
  }

  render() {
    let venue = findVenue(this.props.navigation)
    let nearestOtherVenue = venuesWithDistance(venue.latitude, venue.longitude)[1]
    let nearestOtherVenueDistance = distance(venue.latitude, venue.longitude, nearestOtherVenue.latitude, nearestOtherVenue.longitude)
    let distanceAway = null

    if (this.props.screenProps.latitude && this.props.screenProps.longitude) {
      distanceAway = distance(venue.latitude, venue.longitude, this.props.screenProps.latitude, this.props.screenProps.longitude)
    }

    return (
      <View style={[styles.container, styles.detailPage]}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.venueName}>{ venue.name }</Text>
          <Text style={styles.address}>{ venue.address }</Text>
          <Text style={styles.distance}>{ distanceAway ? `${distanceAway} miles away` : 'Unknown distance away' }</Text>
          <Image
            style={styles.image}
            source={{uri: venue.imageUrl}}
          />

          <View style={styles.nearby}>
            <Text style={styles.nearbyLabel}>Nearby:</Text>
            <Button
              color="#bbb"
              title={ `${nearestOtherVenue.name } (${nearestOtherVenueDistance} miles)` }
              onPress={() => this.props.navigation.navigate('Details', { id: nearestOtherVenue.id })}
            />
          </View>


          <Button
            color="#e47154"
            title="Back"
            onPress={() => this.props.navigation.goBack()}
          />
        </ScrollView>
      </View>
    )
  }
}

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

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  // The Geolocation API
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      let longitude = position.coords.longitude
      let latitude = position.coords.latitude
      this.setState({ latitude, longitude, position })
    }, (error) => {
      // Silence is golden.
    }, {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000
    })

    this.watchID = navigator.geolocation.watchPosition((position) => {
      let longitude = position.coords.longitude
      let latitude = position.coords.latitude
      this.setState({ latitude, longitude, position })
    }, ()=>{}, {})
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    let { latitude, longitude, position } = this.state
    return <RootStack screenProps={ { latitude, longitude, position } } />
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#eee',
    flex: 1,
    justifyContent: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
    margin: 10,
  },
  detailPage: {
    backgroundColor: '#1F439B',
  },
  row: {
    alignItems: 'center',
    backgroundColor: '#1F439B',
    marginBottom: 10,
    padding: 20,
  },
  rowText: {
    color: '#fff',
  },
  distance: {
    color: '#e47154',
    fontSize: 14,
    fontStyle: 'italic',
    margin: 5,
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
  nearby: {
    alignItems: 'center',
    backgroundColor: '#5775bf',
    margin: 10,
    padding: 20,
  },
  nearbyLabel: {
    color: '#eee',
  }
});
