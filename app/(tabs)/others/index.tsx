import { Stack, useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';


export default function Others() {
    const router = useRouter();
    useEffect(() => {
        Toast.show({ type: 'info', text1: 'Hello'});
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button title="Go to People" onPress={() => router.push('/others/people')} />
            <Button title="Go to Cases" onPress={() => router.push('/others/cases')} />
            <Button title="Toast" />
        </View>
    );
}
