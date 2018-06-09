// IMPORT LIBRARY
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// `import`, `from`, `class`, `extends`, and the `() =>` syntax are all ES2015(also known as ES6) features

// REACT COMPONENT
export default class App extends React.Component {
  // render function returns some JSX to render
  render() {
    return (
      // JSX syntax for embedding XML within JavaScript
      // React components used over HTML tags like <div> or <span>
      // <Text> is a built-in component that just displays some text
      // Text supports nesting, styling, and touch handling
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

// CSS STYLE SHEET - style your application using JavaScript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
