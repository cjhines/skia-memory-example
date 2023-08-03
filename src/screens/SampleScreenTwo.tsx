import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SkiaPictureView } from '@shopify/react-native-skia';
import React, { FunctionComponent } from 'react';
import { Button, FlatList, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSVGPicture } from './useSVGPicture';
import { AppStackParamList } from '../AppNavigator';
import AppTouchable from '../components/AppTouchable';

type Navigation = StackNavigationProp<AppStackParamList, 'SampleTwo'>;

const data = Array.from({ length: 90 }, (_, index) => index);

interface ListItemProps {
  onPress: () => void;
}

const ListItem: FunctionComponent<ListItemProps> = ({ onPress }) => {
  const svg = useSVGPicture();
  if (!svg) {
    return <></>;
  }

  return (
    <AppTouchable onPress={onPress}>
      <SkiaPictureView picture={svg} style={{ height: 50, width: 50 }} />
    </AppTouchable>
  );
};

const SampleScreenTwo: FunctionComponent = () => {
  const rotation = useSharedValue(0);
  const navigation = useNavigation<Navigation>();

  const startSpinning = () => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
    );
  };

  const spinStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const onPress = () => {
    navigation.navigate('SampleTwo');
  };

  const renderItem = () => <ListItem onPress={onPress} />;

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Button title="Close" onPress={() => navigation.goBack()} />
      <View>
        <Animated.View style={[styles.box, spinStyle]} />
      </View>
      <FlatList numColumns={3} data={data} renderItem={renderItem} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
});

export default SampleScreenTwo;
