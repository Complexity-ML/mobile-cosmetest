// FormField.tsx
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Alert, Platform } from 'react-native';
import { TextInput as PaperTextInput, HelperText, Text, Button, Dialog, Portal, RadioButton } from 'react-native-paper';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Feather';
// remove native Modal/Picker in favor of Paper Menu for selects
// Removed inline FieldAlert to avoid duplicate error rendering with Paper HelperText


export type FormFieldType = 'text' | 'select' | 'date' | 'textarea' | 'number';
export type FormFieldOption = string | { label: string; value: string };

export interface FormFieldProps {
  label: string;
  id: string;
  type?: FormFieldType;
  value?: string;
  onChange: (name: string, value: string) => void;
  onBlur?: () => void;
  required?: boolean;
  error?: string | null;
  options?: FormFieldOption[];
  placeholder?: string;
  infoTooltip?: string | null;
  numberOfLines?: number;
  autoFocus?: boolean;
  focusRequestId?: number;
}

// Utility function to convert a date to ISO format
export const toISODateString = (dateString?: string | Date): string => {
  try {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  } catch (error) {
    console.error('Date conversion error:', error);
    return '';
  }
};

const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  onBlur,
  required = false,
  error = null,
  options = [],
  placeholder = '',
  infoTooltip = null,
  numberOfLines = 3,
  autoFocus = false,
  focusRequestId,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showSelectDialog, setShowSelectDialog] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value || '');
  const inputRef = React.useRef<any>(null);

  // Update selectedOption when value changes
  useEffect(() => {
    setSelectedOption(value || '');
  }, [value]);

  // Focus management triggered only when focusRequestId changes
  const lastAppliedFocusId = React.useRef<number | undefined>(undefined);
  // Initialize lastAppliedFocusId on mount to avoid triggering on initial renders
  useEffect(() => {
    if (focusRequestId !== undefined && lastAppliedFocusId.current === undefined) {
      lastAppliedFocusId.current = focusRequestId;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!autoFocus) return;
    if (focusRequestId === undefined) return;
    if (lastAppliedFocusId.current === focusRequestId) return;
    lastAppliedFocusId.current = focusRequestId;

    if (type === 'select') {
      setShowSelectDialog(true);
      return;
    }
    if (type === 'date') {
      setShowDatePicker(true);
      return;
    }
    inputRef.current?.focus?.();
  }, [autoFocus, type, focusRequestId]);

  // Handle date selection
  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const dateStr = toISODateString(selectedDate);
      onChange(id, dateStr);
    }
  };

  return (
    <View style={{ marginBottom: 16 }}>
      <Text>
        {label}
        {required && ' *'}
      </Text>
      {infoTooltip && (
        <TouchableOpacity onPress={() => Alert.alert('Info', infoTooltip)}>
          <Icon name="info" size={16} />
        </TouchableOpacity>
      )}

      {type === 'select' ? (
        <>
          <TouchableOpacity onPress={() => setShowSelectDialog(true)}>
            <PaperTextInput
              ref={inputRef}
              mode="outlined"
              value={value || ''}
              placeholder={placeholder || 'Sélectionner...'}
              right={<PaperTextInput.Icon icon="chevron-down" />}
              editable={false}
              error={!!error}
            />
          </TouchableOpacity>

          <Portal>
            <Dialog visible={showSelectDialog} onDismiss={() => setShowSelectDialog(false)}>
              <Dialog.Title>{label}</Dialog.Title>
              <Dialog.Content>
                <RadioButton.Group
                  onValueChange={(newValue) => setSelectedOption(newValue)}
                  value={selectedOption}
                >
                  {(options || []).map((opt, idx) => {
                    const labelOpt = typeof opt === 'string' ? opt : (opt as any).label;
                    const valueOpt = typeof opt === 'string' ? opt : (opt as any).value;
                    return (
                      <View key={`${valueOpt}-${idx}`}>
                        <RadioButton.Item
                          label={labelOpt}
                          value={valueOpt}
                        />
                      </View>
                    );
                  })}
                </RadioButton.Group>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setShowSelectDialog(false)}>Annuler</Button>
                <Button onPress={() => {
                  onChange(id, selectedOption);
                  setShowSelectDialog(false);
                }}>OK</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>

          {!!error && (
            <HelperText type="error" visible={true}>
              {error}
            </HelperText>
          )}
        </>
      ) : type === 'date' ? (
        <>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <PaperTextInput
              ref={inputRef}
              mode="outlined"
              value={value ? new Date(value).toLocaleDateString('fr-FR') : ''}
              placeholder={placeholder || 'Sélectionner une date'}
              right={<PaperTextInput.Icon icon="calendar" />}
              editable={false}
              error={!!error}
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={value ? new Date(value) : new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          {!!error && (
            <HelperText type="error" visible={true}>
              {error}
            </HelperText>
          )}
        </>
      ) : type === 'textarea' ? (
        <>
          <PaperTextInput
            ref={inputRef}
            mode="outlined"
            value={value || ''}
            onChangeText={(text) => onChange(id, text)}
            placeholder={placeholder}
            multiline
            numberOfLines={numberOfLines}
          />
          {!!error && (
            <HelperText type="error" visible={true}>
              {error}
            </HelperText>
          )}
        </>
      ) : (
        <>
          <PaperTextInput
            ref={inputRef}
            mode="outlined"
            value={value || ''}
            onChangeText={(text) => onChange(id, text)}
            onBlur={onBlur}
            placeholder={placeholder}
            keyboardType={type === 'number' ? 'numeric' : 'default'}
            error={!!error}
          />
          {!!error && (
            <HelperText type="error" visible={true}>
              {error}
            </HelperText>
          )}
        </>
      )}
    </View>
  );
};

export default FormField;
