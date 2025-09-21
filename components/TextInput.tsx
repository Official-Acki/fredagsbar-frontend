import { useThemeColor } from "@/hooks/useThemeColor";
import { TextInput as RTextInput, TextInputProps as RNTextInputProps } from "react-native";

interface TextInputProps extends RNTextInputProps {
    // Add any additional custom props here if needed
}

export function TextInput({ style, ...restProps }: TextInputProps) {
    const color = useThemeColor({ colorName: 'text' });
    const backgroundColor = useThemeColor({ colorName: 'primary', colorBrightness: 100 });

    const combinedStyle = {
        color: color,
        backgroundColor: backgroundColor,
        borderColor: color,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        width: '80%',
        marginBottom: 20,
        ...style, // Allow overriding styles via props
    };

    return <RTextInput style={combinedStyle} {...restProps} />;
}