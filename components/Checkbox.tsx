import { useThemeColor } from "@/hooks/useThemeColor";
import { CheckboxProps as ECheckboxProps, Checkbox as ECheckbox } from "expo-checkbox";
import { StyleSheet } from "react-native";


interface CheckboxProps extends Omit<ECheckboxProps, 'onValueChange'> {
    onValueChange?: (value: boolean) => void;
} 

export default function Checkbox({ style, onValueChange, ...restProps }: CheckboxProps) {

    const originalStyle = StyleSheet.create({
        checkbox: {
            marginVertical: 10,
            width: 24,
            height: 24,
        }
    });

    return (
        <ECheckbox {...restProps} color={useThemeColor({ colorName: 'accent' })} style={[originalStyle.checkbox, style]} onValueChange={onValueChange} />
    );
}