import { Event } from "@/constants/Interfaces";
import { ThemedTextProps, Text } from "../Text";
import { StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";

type EventProps = ThemedTextProps & {
    event: Event | null;
}

export function EventTitle({ event, style, ...props }: EventProps) {
    
    console.log("Rendering EventTitle with event:", event);

    if (!event) {
        return <Text {...props}>No Current Event</Text>;
    }

    const originalStyle = StyleSheet.create({
        title: {
            position: 'absolute',
            top: 120,
            left: 0,
            right: 0,
            textAlign: 'center',
        },
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 10,
        },
        iconLeft: {
            width: 50,
            height: 50,
            // position: 'absolute',
            // left: '25%',
            top: 0,
            transform: [{ scaleX: -1 }],
        },
        iconRight: {
            width: 50,
            height: 50,
            // position: 'absolute',
            // right: '25%',
            top: 0,
        },
    });


    return (
        <Text type="title" style={[originalStyle.title, style]} {...props}>
            <View style={originalStyle.container}>
                <Image source={require('@/assets/beer-transparent.png')} style={originalStyle.iconLeft} />
                {event.name}
                <Image source={require('@/assets/beer-transparent.png')} style={originalStyle.iconRight} />
            </View>
        </Text>
    );

}