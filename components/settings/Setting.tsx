import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "../Text";
import { Styling } from "@/constants/Styling";
import React from "react";
import { TextInput } from "../TextInput";
import { NumberInput } from "../NumberInput";
import Checkbox from "../Checkbox";

type Constructor<T> = { new (...args: any[]): T } | ((...args: any[]) => T);

// Special type for button actions
const ButtonAction = 'ButtonAction' as const;
type ButtonActionType = typeof ButtonAction;

interface SettingProps<T> {
    type: Constructor<T> | ButtonActionType;
    default: T;
    onChange: (value: T) => void;
    title: string;
    description?: string;
    buttonText?: string; // Optional button text
}

export function Setting<T>({ type, default: defaultValue, onChange, title, description, buttonText }: SettingProps<T>) {
    const [isChecked, setChecked] = React.useState(false);


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row',
            margin: 10,
            padding: 5,
            borderBottomWidth: 1,
            borderBottomColor: useThemeColor({ colorName: 'text' }),
        },
        button: {
            backgroundColor: useThemeColor({ colorName: 'accent' }),
            padding: 10,
            borderRadius: 5,
            marginTop: 5,
            alignItems: 'center',
            width: 100,
        },
        checkbox: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: 100,
        },
        buttonText: {
            color: useThemeColor({ colorName: 'text', colorBrightness: 100 }),
            fontWeight: 'bold',
        }
    });

    if (!description) description = `A ${type === ButtonAction ? type.toString() : type.name} setting with default state of ${defaultValue}`;

    return (
        <View style={styles.container}>
            <View style={{ flex: 3 }}>
                <Text>{title}</Text>
                <Text>{description}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {(type as any) === Number && (
                    <NumberInput style={[styles.button, styles.buttonText]} />
                )}
                {(type as any) === Boolean && (
                    <Checkbox style={styles.checkbox} size={32} onValueChange={setChecked} text={isChecked ? "On" : "Off"} />
                )}
                {type === ButtonAction && (
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => onChange(undefined as T)}
                    >
                        <Text style={styles.buttonText}>
                            {buttonText || title}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}