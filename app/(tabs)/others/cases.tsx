import { Stack, useNavigation } from 'expo-router';
import { Button, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

export default function People() {
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
        </View>
    );
}