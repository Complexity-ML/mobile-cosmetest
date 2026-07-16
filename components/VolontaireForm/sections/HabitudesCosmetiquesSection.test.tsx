import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Button } from 'react-native-paper';
import HabitudesCosmetiquesSection from './HabitudesCosmetiquesSection';

const props = {
  formData: {},
  errors: {},
  handleChange: jest.fn(),
  handleBlur: jest.fn(),
};

describe('HabitudesCosmetiquesSection', () => {
  it('présente une seule catégorie à la fois avec une navigation guidée', () => {
    const tree = renderer.create(<HabitudesCosmetiquesSection {...props} />);
    const initial = JSON.stringify(tree.toJSON());

    expect(initial).toContain("Habitudes d'achat");
    expect(initial).not.toContain('Épilation');

    const nextButton = tree.root
      .findAllByType(Button)
      .find((button) => String(button.props.children).includes('Catégorie suivante'));
    expect(nextButton).toBeDefined();

    act(() => nextButton?.props.onPress());
    const afterNext = JSON.stringify(tree.toJSON());
    expect(afterNext).toContain('Épilation');
    expect(afterNext).not.toContain("Habitudes d'achat");
  });
});
