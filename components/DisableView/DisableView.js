import React from 'react';
import { View } from 'react-native';

const DisableView = ({ children, disable }) => {
  return (
    <View
      style={{ opacity: disable ? 0.5 : 1 }}
      pointerEvents={disable ? 'none' : 'box-none'}>
      {children}
    </View>
  );
};

export default DisableView;
