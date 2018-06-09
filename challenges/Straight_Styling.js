import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

// <View> is analogous to HTML’s <div>
// <Text> is analogous to <p>
// <Image> is analogous to <img>

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Try this:</Text>
        <Image
          style={styles.image}
          source={{uri: 'https://media.giphy.com/media/N04Fkkzhf9slO/giphy.gif'}}
        />
        <View style={styles.textContainer}>
          <Text style={styles.nestedText}>
            I'm on the <Text style={styles.blueText}>left</Text>.
          </Text>
          <Text style={styles.nestedText}>
            I'm on the <Text style={styles.orangeText}>right</Text>.
          </Text>
        </View>
      </View>
    );
  }
}

// https://facebook.github.io/react-native/docs/style.html
const styles = StyleSheet.create({
  // https://facebook.github.io/react-native/docs/flexbox.html
  container: {
    flex: 1,
    backgroundColor: '#FFD90F', // Simpsons yellow CSS code
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#000',
  },
  textContainer: {
    flexDirection: 'row',
  },
  nestedText: {
    color: '#000',
    padding: 25,
  },
  // https://facebook.github.io/react-native/docs/height-and-width.html
  image: {
    height: 200,
    margin: 25,
    width: 200,
    borderWidth: 5,
    borderColor: '#222',
    borderRadius: 100,
  },
  // https://facebook.github.io/react-native/docs/text-style-props.html
  blueText: {
    fontWeight: '900',
    color: '#2095b7',
  },
  orangeText: {
    fontWeight: '900',
    color: '#ef6c2e',
  },
});
