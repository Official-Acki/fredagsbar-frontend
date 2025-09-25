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
import Toast from "react-native-toast-message";

export default function Signup() {
    const router = useRouter();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [repeatPassword, setRepeatPassword] = React.useState('');
    const [inviteCode, setInviteCode] = React.useState('');

    const handleSignup = async () => {
        if (username !== '' && password !== '' && repeatPassword !== '' && inviteCode !== '') {
            if (password !== repeatPassword) {
                alert('Passwords do not match');
                return;
            }
            const formBody = new URLSearchParams();
            formBody.append('username', username);
            formBody.append('password', password);
            formBody.append('invite_code', inviteCode);
            // formBody.append('discord_id', '1');
            const response = await fetch(SERVER_URL + '/auth/register', {
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
                Toast.show({
                    text1: 'Sign Up successful!',
                });
                router.push('/');
            } else {
                alert('Sign Up failed: ' + data.message);
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
            <TextInput placeholder="Repeat Password" secureTextEntry onChangeText={setRepeatPassword} />
            <TextInput placeholder="Invite Code" onChangeText={setInviteCode} />
            <Button title="Sign Up" onPress={handleSignup} />
            <Text>Sign Up Screen (coming soon!)</Text>
        </SafeAreaView>
    );
}