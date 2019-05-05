import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  View,
  Image
} from 'react-native';

import Swiper from 'react-native-swiper';

export class SlideComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {
      return (
          <Swiper style={styles.wrapper} showsButtons={true} loop={false} showsPagination={false}>
            <View style={styles.slide1}>
              <Image resizeMode='cover' source={require('../../src/img/img1.png')} />
            </View>
            <View style={styles.slide2}>
              <Image resizeMode='center' source={require('../../src/img/img2.png')} />
            </View>
            <View style={styles.slide3}>
              <Image style={ { marginBottom: 80 } } resizeMode='cover' source={require('../../src/img/img3.jpg')} />
              <Button
                title="Ver a ISS no google maps"
                accessibilityLabel="Clique aqui para ver a ISS no google maps"
                onPress={ () => this.gotoMaps() } />
            </View>
          </Swiper>
      );
  }

  gotoMaps() {
    this.props.onShowMap();
  }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000',
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000',
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000'
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    },
})