import { Button, View } from "react-native";
import { Text } from "@/components/Text";
import { SafeAreaView } from "react-native-safe-area-context";
import { Setting } from "@/components/settings/Setting";
import { PostRequest, WhoAmI } from "@/handlers/AuthorizedRequests";
import { withMiddleware } from "@/components/Middleware";
import { useRouter } from "expo-router";

function Settings() {
    const router = useRouter();

    return (
        <SafeAreaView>
            <Text>Settings Screen</Text>
            <Setting title="Test" type={Number} default={0} />
            <Setting title="Test" type={Boolean} default={false} />
            <Setting title="Test" type={Number} default={0} />
            <Setting
                title="Log Out"
                type={"ButtonAction"}
                default={undefined}
                onChange={async () => {
                    const formBody = new URLSearchParams();
                    const person = await WhoAmI();
                    if (!person) return;
                    console.log(person);
                    formBody.set("person_id", person.id.toString());
                    await PostRequest("/auth/logout", formBody);
                    router.navigate("/login");
                }} />
        </SafeAreaView>
    );
}

export default withMiddleware(Settings);