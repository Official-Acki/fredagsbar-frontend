import { Styling } from "@/constants/Styling";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, TouchableHighlight, TouchableHighlightProps } from "react-native";
import { Text } from "./Text";

export type ThemedButtonProps = TouchableHighlightProps & {
    title: string;
    titleStyle?: object;
};


export default function Button({
    style,
    title,
    titleStyle,
    ...props
}: ThemedButtonProps) {

    const styles = StyleSheet.create({
        button: {
            color: useThemeColor({ colorName: "text", colorBrightness: 100 }),
            textDecorationLine: "none",
            textAlign: "center",
            backgroundColor: useThemeColor({colorName: "accent"}),
            margin: 10,
            padding: 10,
            borderRadius: Styling.borderRadius
        },
        title: {
            color: useThemeColor({ colorName: 'text', colorBrightness: 100 }),
            fontWeight: 'bold',
        }
    });

    return <TouchableHighlight style={[styles.button, style]} {...props}><Text style={[styles.title, titleStyle]}>{title}</Text></TouchableHighlight>;
}