import { View } from "react-native";
import { Text } from "@/components/Text";
import { SafeAreaView } from "react-native-safe-area-context";
import { Setting } from "@/components/settings/Setting";

export default function Settings() {
    return (
        <SafeAreaView>
            <Text>Settings Screen</Text>
            <Setting title="Test" type={Number} default={0} />
            <Setting title="Test" type={Boolean} default={false} />
            <Setting title="Test" type={Number} default={0} />
        </SafeAreaView>
    );
}