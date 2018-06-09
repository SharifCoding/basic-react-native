import React from "react";
import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default class App extends React.Component {
  constructor() {
    super();
    // You may want to put stuff here.
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Up next...</Text>
        <Text style={styles.instructions}>
          Build an app to launch a rocket.
        </Text>
        <Text style={styles.instructions}>
          It should include some type of launch safeguard{"\n"}
          to enable and disable a main Launch button.
        </Text>
        <Text style={styles.instructions}>
          For the purposes of this example, don't actually{"\n"}
          launch a rocket. Instead you can just show a picture{"\n"}
          of a rocket launch instead. You can find one at{"\n"}
          ./resources/images/launch.gif
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 20
  },
  instructions: {
    marginTop: 10,
    textAlign: "center"
  }
});
