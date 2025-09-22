import React from 'react';
import { Appbar } from 'react-native-paper';

type FormHeaderProps = {
  title: string;
  onBack: () => void;
};

export const FormHeader: React.FC<FormHeaderProps> = ({ title, onBack }) => (
  <Appbar.Header>
    <Appbar.BackAction onPress={onBack} />
    <Appbar.Content title={title} />
  </Appbar.Header>
);

export default FormHeader;