import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Next challenge!</Text>
        <Text style={styles.instructions}>
          Try to build a replica of the screen{"\n"}
          shown in the challenge directions.
        </Text>
        <Text style={styles.instructions}>(The one below.)</Text>
        <Image
          style={styles.targetImage}
          source={{
            uri: "https://monosnap.com/file/PRQic7aie4TUrLxdgK6ydqm8xWTEAw.png"
          }}
        />
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
    margin: 10
  },
  instructions: {
    marginTop: 10,
    textAlign: "center"
  },
  targetImage: {
    width: 200,
    height: 400,
    marginTop: 25
  }
});
