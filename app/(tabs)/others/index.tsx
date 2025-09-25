import { Stack, useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '@/components/Text';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Button from '@/components/Button';


export default function Others() {
    const router = useRouter();

    return (
        <SafeAreaProvider style={styles.container}>
            <Text type='title'>Other things</Text>
            <Text>The things that didn't fit elsewhere</Text>
            <TouchableOpacity onPress={() => router.push('/others/people')} style={styles.button}>
                <Text>Go to People</Text>
            </TouchableOpacity>
            <Button title="Go" onPress={() => router.push('/others/cases')} style={styles.button}>
                <Text>Go to Cases</Text>
            </Button>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        marginTop: 10,
    },
});