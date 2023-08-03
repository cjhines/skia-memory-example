import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Skia, SkiaPictureView } from '@shopify/react-native-skia';
import React, { FunctionComponent, useMemo } from 'react';
import { Button, FlatList, View, StyleSheet } from 'react-native';

import { svgData } from './svg';

const Stack = createStackNavigator();

const data = Array.from({ length: 90 }, (_, index) => index);

export const useSVGPicture = () => {
  return useMemo(() => {
    const recorder = Skia.PictureRecorder();
    const themedSVG = Skia.SVG.MakeFromString(svgData);
    if (!themedSVG) {
      return null;
    }
    const canvas = recorder.beginRecording(Skia.XYWHRect(0, 0, 48, 48));
    canvas.drawSvg(themedSVG);
    return recorder.finishRecordingAsPicture();
  }, []);
};

const ListItem: FunctionComponent = () => {
  const svg = useSVGPicture();
  if (!svg) {
    return <></>;
  }
  return <SkiaPictureView picture={svg} style={styles.picture} />;
};

const SampleScreenOne: FunctionComponent = () => {
  const navigation = useNavigation<any>();
  const renderItem = () => <ListItem />;

  return (
    <View style={styles.container}>
      <Button
        title="Navigate"
        onPress={() => navigation.navigate('SampleTwo')}
      />
      <FlatList numColumns={3} data={data} renderItem={renderItem} />
    </View>
  );
};

const SampleScreenTwo: FunctionComponent = () => {
  const navigation = useNavigation<any>();
  const renderItem = () => <ListItem />;

  return (
    <View style={styles.container}>
      <Button title="Close" onPress={() => navigation.goBack()} />
      <FlatList numColumns={3} data={data} renderItem={renderItem} />
    </View>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SampleOne" component={SampleScreenOne} />
        <Stack.Screen name="SampleTwo" component={SampleScreenTwo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => <AppNavigator />;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  picture: {
    height: 50,
    width: 50,
  },
});

export default App;
