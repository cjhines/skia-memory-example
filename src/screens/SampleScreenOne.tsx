import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SkiaPictureView } from '@shopify/react-native-skia';
import React, { FunctionComponent } from 'react';
import { Button, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSVGPicture } from './useSVGPicture';
import { AppStackParamList } from '../AppNavigator';
import AppTouchable from '../components/AppTouchable';

type Navigation = StackNavigationProp<AppStackParamList, 'SampleOne'>;

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

const SampleScreenOne: FunctionComponent = () => {
  const navigation = useNavigation<Navigation>();

  const onPress = () => {
    navigation.navigate('SampleTwo');
  };

  const renderItem = () => <ListItem onPress={onPress} />;

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Button title="Navigate" onPress={onPress} />
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
});

export default SampleScreenOne;
