import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  Alert,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import {useNavigation} from 'react-navigation-hooks';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {
  onGestureEvent,
  snapPoint,
  timing,
  useValues,
} from 'react-native-redash';
import Animated, {
  Extrapolate,
  and,
  block,
  call,
  cond,
  eq,
  interpolate,
  set,
  useCode,
} from 'react-native-reanimated';
import {useMemoOne} from 'use-memo-one';

const {width, height} = Dimensions.get('window');

const Scene2 = props => {
  //console.log(props);
  const {navigation} = props;
  const {goBack, getParam} = useNavigation();
  const [
    translationX,
    translationY,
    velocityY,
    translateX,
    translateY,
    snapBack,
    state,
  ] = useValues([0, 0, 0, 0, 0, 0, State.UNDETERMINED], []);
  const snapTo = snapPoint(translationY, velocityY, [0, height]);
  const scale = interpolate(translateY, {
    inputRange: [0, height / 2],
    outputRange: [1, 0.75],
    extrapolate: Extrapolate.CLAMP,
  });
  const gestureHandler = useMemoOne(
    () => onGestureEvent({translationX, translationY, velocityY, state}),
    [state, translationX, translationY, velocityY],
  );
  /*useCode(
    () =>
      block([
        cond(
          and(eq(state, State.END), eq(snapTo, height), eq(snapBack, 0)),
          set(snapBack, 1),
        ),
        cond(
          snapBack,
          call([], () => goBack()),
          cond(
            eq(state, State.END),
            [
              set(
                translateX,
                timing({from: translationX, to: 0, duration: 250}),
              ),
              set(
                translateY,
                timing({from: translationY, to: 0, duration: 250}),
              ),
            ],
            [set(translateX, translationX), set(translateY, translationY)]
          ),
        ),
      ]),
    // we disable the deps because we don't want the identity change on
    // snapPoint to trigger a side effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );*/

  return (
    <View style={StylesLocal.container}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: '#C14534',
            //transform: [{translateX}, {translateY}, {scale}],
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            //style={StylesLocal.container}
            //onPress={() => goBack()}
            onPress={() => navigation.push('screen1', {item: 'shoe'})}
            //onPress={() => navigation.goBack()}
          >
            <SharedElement id="shoe">
              <Animated.Image
                style={StylesLocal.shoe}
                source={require('../../assets/images/air-jordan-1.png')}
              />
            </SharedElement>
            <SharedElement id="paper">
              <View style={StylesLocal.paper} />
            </SharedElement>
            <SharedElement id="price">
              <Text style={StylesLocal.price}>$ 299</Text>
            </SharedElement>
            <SharedElement id="title">
              <View style={StylesLocal.headerContainer}>
                <Text style={StylesLocal.header}>PRODUTO</Text>
                <Text style={StylesLocal.subheader}>MODELO</Text>
              </View>
            </SharedElement>
            <View style={StylesLocal.smallImageContainer}>
              <SharedElement id="small1">
                <View style={StylesLocal.smallImageWrapper}>
                  <Image
                    style={StylesLocal.smallImage}
                    source={require('../../assets/images/air-jordan-1.png')}
                  />
                </View>
              </SharedElement>
              <SharedElement id="small2">
                <View style={StylesLocal.smallImageWrapper}>
                  <Image
                    style={StylesLocal.smallImage}
                    source={require('../../assets/images/air-jordan-1.png')}
                  />
                </View>
              </SharedElement>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const StylesLocal = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C14534',
  },
  logo: {
    alignSelf: 'center',
    paddingBottom: '30%',
    width: 180,
  },
  formWrapper: {
    width: '85%',
    alignSelf: 'center',
  },
  fieldWrapper: {
    marginTop: 15,
    marginBottom: 15,
  },
  /* */
  price: {
    color: '#FFF',
    fontSize: 34,
    fontFamily: 'Bebas Neue',
    textAlign: 'center',
    paddingTop: -55 + Dimensions.get('window').height * 0.5,
  },
  headerContainer: {
    paddingTop: 40,
  },
  header: {
    color: '#444',
    fontSize: 42,
    textAlign: 'center',
    fontFamily: 'Bebas Neue',
    marginBottom: -6,
  },
  subheader: {
    color: '#444',
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'Bebas Neue',
  },
  paper: {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    left: 0,
    top: Dimensions.get('window').height * 0.5,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 70,
    padding: 10,
  },
  shoe: {
    width: 291,
    height: 200,
    position: 'absolute',
    left: Dimensions.get('window').width * 0.5 - 291 / 2,
    top: 60,
    zIndex: 1000,
  },
  shoe2: {
    width: 350,
    height: 240,
    position: 'absolute',
    left: Dimensions.get('window').width * 0.2,
    top: Dimensions.get('window').height * 0.5 - 400,
    //transform: [{rotate: '35deg'}],
  },
  smallImageContainer: {
    position: 'absolute',
    left: 0,
    top: Dimensions.get('window').height * 0.54,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  smallImageWrapper: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECECEC',
    paddingTop: 25,
    paddingBottom: 25,
  },
  smallImage: {
    width: 100,
    height: 70,
  },
});

/*Scene2.sharedElements = navigation => {
  const listing = navigation.getParam('Scene2');
  return listing;
};*/

/*Scene2.sharedElements = (navigation, otherNavigation, showing) => {
  const item = navigation.getParam('item');
  return item;
};*/

Scene2.sharedElements = () => {
  return [
    {
      id: 'paper',
      animation: 'move',
      resize: 'clip',
      //align: 'left-top',
    },
    {
      id: 'shoe',
      animation: 'move',
      resize: 'clip',
      //align: 'left-top',
    },
  ];
};
export default Scene2;
