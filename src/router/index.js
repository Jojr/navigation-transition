import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator, TransitionPresets} from 'react-navigation-stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {Scene1, Scene2} from '../scenes';

/*const Navigator = createStackNavigator({
  screen1: {screen: Scene1},
  screen2: {screen: Scene2},
});*/

/*export const iosTransitionSpec = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 10,
    restSpeedThreshold: 10,
  },
};*/

const Navigator = createSharedElementStackNavigator(
  {
    screen1: {
      screen: Scene1,
    },
    screen2: {
      screen: Scene2,
    },
  },
  {
    initialRouteName: 'screen1',
    mode: 'modal',
    headerMode: 'none',
    defaultNavigationOptions: {
      cardStyleInterpolator: ({current: {progress}}) => {
        const opacity = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        });
        return {cardStyle: {opacity}};
      },
      /*transitionSpec: {
        open: iosTransitionSpec,
        close: iosTransitionSpec,
      },*/
      gestureEnabled: false,
      cardStyle: {
        backgroundColor: 'transparent',
      },
    },
  },
);

export default createAppContainer(Navigator);
