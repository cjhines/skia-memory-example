import React, { FunctionComponent } from 'react';
import { Pressable, PressableProps, StyleSheet } from 'react-native';

const AppTouchable: FunctionComponent<PressableProps> = ({
  style,
  ...props
}) => {
  const isFunctionStyle = typeof style === 'function';
  return (
    <Pressable
      {...props}
      style={
        isFunctionStyle
          ? style
          : ({ pressed }) => [
              {
                opacity: pressed ? 0.6 : 1,
              },
              StyleSheet.flatten(style),
            ]
      }
    />
  );
};

export default AppTouchable;
