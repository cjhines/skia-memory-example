import React, { FunctionComponent } from 'react';
import { ScrollView, ScrollViewProps, StyleSheet } from 'react-native';

const AppScrollView: FunctionComponent<ScrollViewProps> = ({
  contentContainerStyle,
  children,
  ...props
}) => {
  return (
    <ScrollView
      contentContainerStyle={[styles.scrollContainer, contentContainerStyle]}
      bounces={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      overScrollMode="never" // Android only
      {...props}
    >
      {children}
    </ScrollView>
  );
};

export default AppScrollView;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
});
