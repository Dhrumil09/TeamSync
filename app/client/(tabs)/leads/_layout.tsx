import { Stack } from "expo-router"

const StackLayout = ({ }) => {
    return(
        <Stack>
            <Stack.Screen name="index"  options={{ headerShown: false }} />
            <Stack.Screen name="leadDetails"  options={{ headerShown: false }} />

        </Stack>
    )
}

export default StackLayout