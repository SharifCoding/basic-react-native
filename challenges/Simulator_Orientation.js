import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default class App extends React.Component {
  render() {
    // imNotDefined;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Nice work!</Text>
        <Image
          style={styles.image}
          source={{
            uri:
              "https://s3.amazonaws.com/vigesharing-is-vigecaring/lkurtz/rn-workshop-thumbs-up.gif"
          }}
        />
        <Text style={styles.instructions}>
          Now take a look around a bit with the dev tools.
        </Text>
        <Text style={styles.instructions}>
          Remember: press Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 10
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
    // imNotAProperty: 42
  },
  image: {
    height: 100,
    margin: 25,
    width: 200
  }
});
