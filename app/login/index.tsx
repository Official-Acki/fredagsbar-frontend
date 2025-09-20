import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/Text";
import { TextInput } from "@/components/TextInput";
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import React from "react";
import * as SecureStore from 'expo-secure-store';
import { fetch } from "expo/fetch";
import { SERVER_URL } from "@/constants/Server";
import { storeData } from "@/handlers/StorageHandler";

export default function Login() {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ title: "Login" });
    }, [navigation]);

    const router = useRouter();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogin = async () => {
        if (username !== '' && password !== '') {
            const formBody = new URLSearchParams();
            formBody.append('username', username);
            formBody.append('password', password);
            const response = await fetch(SERVER_URL + '/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formBody.toString(),
            });
            const data = await response.json();
            if (response.ok) {
                // Save the whole response as the token
                storeData('authToken', data);
                console.log('Login successful:', data);
                router.push('/');
            } else {
                alert('Login failed: ' + data.message);
            }
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <TextInput placeholder="Username" onChangeText={setUsername} />
            <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
            <Button title="Login" onPress={handleLogin} />
            <Text>Login Screen (coming soon!)</Text>
        </SafeAreaView>
    );
}