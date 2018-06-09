import React from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { StackNavigator } from "react-navigation";

function distance(lat1, lon1, lat2, lon2) {
    var φ1 = Math.PI * lat1 / 180;
    var φ2 = Math.PI * lat2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var dist =
      Math.sin(φ1) * Math.sin(φ2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    return dist.toFixed(2);
  }
  
const venues = [
  {
    id: 1,
    name: "Austin Convention Center",
    address: "500 E Cesar Chavez",
    imageUrl:
      "https://res.cloudinary.com/simpleview/image/upload/c_fill,f_auto,h_240,q_75,w_300/v1/clients/austin/Austin_Convention_Center_Photo_Credit_Thomas_McConnell_Full_Usage_Permissions_5__7e33dc59-1b4c-4de9-9044-c9d18041cca9.jpg",
    latitude: "30.263569",
    longitude: "-97.739606"
  },
  {
    id: 2,
    name: "JW Marriott",
    address: "110 E 2nd St",
    imageUrl:
      "https://wa2.jetcdn.com/photos/jw-marriott-austin/5vOE_FjZ/architecture-city-downtown-building.jpeg?w=780&h=520&dpr=1",
    latitude: "30.264509",
    longitude: "-97.743470"
  },
  {
    id: 3,
    name: "Westin Austin Downtown",
    address: "310 E 5th St",
    imageUrl:
      "http://www.starwoodhotels.com/pub/media/3899/wes3899po.214266_md.jpg",
    latitude: "30.266620",
    longitude: "-97.740375"
  },
  {
    id: 4,
    name: "Hilton Austin Downtown",
    address: "500 E 4th St",
    imageUrl:
      "http://momvoyage.hilton.com/wp-content/uploads/2014/10/Best-Downtown-Austin-Hotels-Hilton-Austin-e1413228104466-940x564.jpg",
    latitude: "30.265259",
    longitude: "-97.738290"
  },
  {
    id: 5,
    name: "The Driskill",
    address: "604 Brazos St",
    imageUrl:
      "https://assets.hospitalityonline.com/photos/employers/258110/404068_l.jpg",
    latitude: "30.268538",
    longitude: "-97.741633"
  }
];

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Getting Around an App</Text>
        <ScrollView contentContainerStyle={styles.centerContent}>
          <Text style={styles.instructions}>
            Using `react-navigation`, make an app{"\n"}
            that lists the venue names in the `venues` array,{"\n"}
            and allows the user to click to view more information.
          </Text>
          <Text style={styles.subtext}>See below for inspiration:</Text>
          <Image
            style={styles.targetImage}
            source={{
              uri:
                "https://monosnap.com/file/GDpr0spLEoewjPiyyAbDC3fjirtL5D.png"
            }}
          />
          <Image
            style={styles.targetImage}
            source={{
              uri:
                "https://monosnap.com/file/R2M8LSTg1ghF7aMclFZXG2e2pTQKrn.png"
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen
    }
  },
  {
    initialRouteName: "Home"
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#eee",
    flex: 1,
    justifyContent: "center"
  },
  centerContent: {
    alignItems: "center"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 10
  },
  subtext: {
    fontSize: 14,
    fontStyle: "italic"
  },
  targetImage: {
    width: 150,
    height: 300,
    marginTop: 25
  }
});
