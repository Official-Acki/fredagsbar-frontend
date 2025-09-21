import { useThemeColor } from "@/hooks/useThemeColor";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { BouncyCheckboxProps } from "react-native-bouncy-checkbox";
import { StyleSheet } from "react-native";
import { Styling } from "@/constants/Styling";
import { MaterialIcons } from "@expo/vector-icons";


interface CheckboxProps extends Omit<BouncyCheckboxProps, 'onValueChange'> {
    onValueChange?: (value: boolean) => void;
} 

export default function Checkbox({ style, onValueChange, ...restProps }: CheckboxProps) {

    const originalStyle = StyleSheet.create({
        checkbox: {
            borderRadius: Styling.borderRadius,
            // width: 24,
            // height: 24,
        }
    });

    return (
        <BouncyCheckbox 
            {...restProps}
            fillColor={useThemeColor({ colorName: 'accent' })}
            iconComponent={<MaterialIcons name="check" size={20} color={useThemeColor({ colorName: 'text', colorBrightness: 100 })} />}
            style={[originalStyle.checkbox, style]}
            textContainerStyle={{ marginLeft: 10 }}
            iconStyle={originalStyle.checkbox}
            innerIconStyle={originalStyle.checkbox}
            text={restProps.text}
            textStyle={{
                textDecorationLine: "none",
                color: useThemeColor({ colorName: 'text' }),
            }}
            onPress={onValueChange}
        />
    );
}