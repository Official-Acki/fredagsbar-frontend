import { useThemeColor } from "@/hooks/useThemeColor";
import { TextInput as RTextInput, TextInputProps as RNTextInputProps, StyleSheet } from "react-native";

export interface TextInputProps extends RNTextInputProps {
    // Add any additional custom props here if needed
}

export function TextInput({ style, ...restProps }: TextInputProps) {
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
            width: '80%',
            marginBottom: 20,
        }
    });

    return <RTextInput style={[originalStyle.input, style]} {...restProps} />;
}