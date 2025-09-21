import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, View } from "react-native";
import { Text } from "../Text";
import { Styling } from "@/constants/Styling";
import React from "react";
import { TextInput } from "../TextInput";
import { NumberInput } from "../NumberInput";
import Checkbox from "../Checkbox";

type Constructor<T> = { new (...args: any[]): T } | ((...args: any[]) => T);

interface SettingProps<T> {
    type: Constructor<T>;
    default: T;
    onChange: (value: T) => void;
    title: string;
    description?: string;
}

export function Setting<T>({ type, default: defaultValue, onChange, title, description }: SettingProps<T>) {
    const [isChecked, setChecked] = React.useState(false);


    const styles = StyleSheet.create({
        container: {
            margin: 10,
            padding: 5,
            borderBottomWidth: 1,
            borderBottomColor: useThemeColor({ colorName: 'text' }),
        }
    });

    if (!description) description = `A ${typeof(defaultValue)} setting with default state of ${defaultValue}`;

    return (
        <View style={styles.container}>
            <Text>{title}</Text>
            <Text>{description}</Text>
            {(type as any) === Number && (
                <NumberInput />
            )}
            {(type as any) === Boolean && (
                <Checkbox value={isChecked} onValueChange={setChecked} />
            )}
        </View>
    );
}