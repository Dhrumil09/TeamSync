import Feather from "@expo/vector-icons/Feather";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons'; 
import { Tabs } from 'expo-router';
import { useSelector } from "react-redux";

export default function TabLayout() {
  const userType = useSelector((state: { user: { userType: string } }) => state.user.userType);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarStyle: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color }) => <Feather size={24} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="leads"
        options={{
          headerShown: false,
          title: 'leads',
          tabBarIcon: ({ color }) => <Feather size={24} name="menu" color={color} />,
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          headerShown: false,
          title: 'Users',
           href:userType == 'admin' ? '/client/(tabs)/users' : null,
          tabBarIcon: ({ color }) => <Ionicons size={24} name="people-outline" color={color} />,

        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({ color }) => <Feather size={24} name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
