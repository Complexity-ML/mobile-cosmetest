import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';
import CheckboxField from './CheckboxField';

describe('CheckboxField', () => {
  it('propose Oui, Non et Je ne sais pas avec de grandes zones tactiles', () => {
    const onChange = jest.fn();
    const tree = renderer.create(
      <CheckboxField label="Peau sensible" id="sensible" value="" onChange={onChange} />,
    );

    const buttons = tree.root.findAllByType(TouchableOpacity);
    expect(buttons).toHaveLength(3);
    expect(buttons.every((button) => button.props.accessibilityRole === 'button')).toBe(true);

    act(() => buttons[2].props.onPress());
    expect(onChange).toHaveBeenCalledWith('sensible', '');
  });
});
