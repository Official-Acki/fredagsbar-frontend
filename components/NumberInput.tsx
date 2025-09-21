import { useThemeColor } from "@/hooks/useThemeColor";
import { TextInput, TextInputProps } from "./TextInput";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

interface NumberInputProps extends Omit<TextInputProps, 'onChange'> {
    // Add any additional custom props here if needed
    onNumberChange?: (value: number) => void;
}

export function NumberInput({ style, onNumberChange, ...restProps }: NumberInputProps) {
    const color = useThemeColor({ colorName: 'text' });
    const backgroundColor = useThemeColor({ colorName: 'primary', colorBrightness: 100 });

    const originalStyle = StyleSheet.create({
        input: {
            color: color,
            backgroundColor: backgroundColor,
            borderColor: color,
            borderWidth: 1,
            padding: 10,
            borderRadius: 5,
            width: 100,
            marginBottom: 20,
        }
    });

    const [value, setValue] = useState('');

    const handleChange = (text: string) => {
        // Only allow numeric characters (optional, helps prevent unwanted input)
        const numericText = text.replace(/[^0-9]/g, '');
        setValue(numericText);
    };

    useEffect(() => {
        if (onNumberChange) {
            const numberValue = parseInt(value, 10);
            if (!isNaN(numberValue)) {
                onNumberChange(numberValue);
            } else {
                onNumberChange(0); // or handle as needed
            }
        }
    }, [value, onNumberChange]);

    return (
        <TextInput
            style={[originalStyle.input, style]}
            {...restProps}
            value={value}
            onChangeText={handleChange}
            keyboardType="numeric" // Shows number pad
            placeholder="0"
            maxLength={10} // Optional: limit number length
        />
    );
}