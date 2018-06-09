import React from 'react';
import { Button, Dimensions, Image, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      allowLaunch: false,
      launched: false
    }
  }

  // https://facebook.github.io/react-native/docs/handling-touches.html
  renderLaunchControl() {
    if (this.state.launched) return null

    let buttonStyle = this.state.allowLaunch ? [styles.launchButton, styles.launchButtonActive] : [styles.launchButton]

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Launch Control</Text>
        {/* https://facebook.github.io/react-native/docs/switch.html */}
        <Switch
         onValueChange={(value) => this.setState({ allowLaunch: value })}
         value={this.state.allowLaunch} />
        <View style={styles.launchControl}>
          {/* https://facebook.github.io/react-native/docs/button.html */}
          {/* <Button> handle touch interactions component */}
          {/* Touchables event handler props; `onLongPress`, `onPress`, `onPressIn`, and `onPressOut` */}
          <Button color="#f00" disabled={!this.state.allowLaunch} onPress={()=>{ this.setState({ launched: true, allowLaunch: false }) }} style={buttonStyle} title="Launch!"/>
        </View>
      </View>
    )
  }

  renderRocket() {
    if (!this.state.launched) return null

    let {height, width} = Dimensions.get('window')

    return (
      // https://facebook.github.io/react-native/docs/touchablehighlight.html
      // <TouchableOpacity> handle touch interactions component
      // Touchables event handler props; `onLongPress`, `onPress`, `onPressIn`, and `onPressOut`
      <TouchableOpacity onPress={()=>{ this.setState({ launched: false }) }}>
        <Image
          style={{ height, width }}
          source={require('./resources/images/lollapalooza-support-03.gif')}
        />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      // https://facebook.github.io/react-native/docs/view.html
      <View style={styles.container}>
        { this.renderLaunchControl() }
        { this.renderRocket() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD90F', // Simpsons yellow CSS code
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
  },
  instructions: {
    marginTop: 10,
    textAlign: 'center',
  },
  whiteText: {
    color: '#eee',
  },
  launchControl: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    margin: 25,
    padding: 10,
  },
  launchButton: {
    padding: 25,
    backgroundColor: 'grey',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 15,
  },
  launchButtonActive: {
    backgroundColor: '#c02f1d',
    borderColor: '#8E1A0B',
  },
});
