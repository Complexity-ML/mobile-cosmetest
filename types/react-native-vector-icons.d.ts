declare module 'react-native-vector-icons/Feather' {
  import * as React from 'react';
  import { StyleProp, TextStyle } from 'react-native';

  export interface FeatherIconProps {
    name: string;
    size?: number;
    color?: string;
    style?: StyleProp<TextStyle>;
    allowFontScaling?: boolean;
  }

  const Feather: React.ComponentType<FeatherIconProps>;
  export default Feather;
}

