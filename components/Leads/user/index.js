import React from "react";
import {
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { router } from "expo-router";

const sampleData = [
  {
    id: 1,
    name: "John Doe",
    location: "New York, NY",
    priority: 1,
    rating: 4,
    dateTime: "10/10/2021",
  },
  {
    id: 2,
    name: "Jane Smith",
    location: "Los Angeles, CA",
    priority: 2,
    rating: 4.5,
    dateTime: "11/10/2021",
  },
  {
    id: 3,
    name: "Michael Johnson",
    location: "Chicago, IL",
    priority: 3,
    rating: 3.5,
    dateTime: "12/10/2021",
  },
  {
    id: 4,
    name: "Emily Davis",
    location: "Houston, TX",
    priority: 1,
    rating: 4.8,
    dateTime: "01/11/2021",
  },
  {
    id: 5,
    name: "David Wilson",
    location: "Phoenix, AZ",
    priority: 2,
    rating: 4.2,
    dateTime: "02/11/2021",
  },
  {
    id: 6,
    name: "Sarah Brown",
    location: "Philadelphia, PA",
    priority: 3,
    rating: 3.8,
    dateTime: "03/11/2021",
  },
  {
    id: 7,
    name: "James Taylor",
    location: "San Antonio, TX",
    priority: 1,
    rating: 4.7,
    dateTime: "04/11/2021",
  },
  {
    id: 8,
    name: "Patricia Miller",
    location: "San Diego, CA",
    priority: 2,
    rating: 4.1,
    dateTime: "05/11/2021",
  },
  {
    id: 9,
    name: "Robert Martinez",
    location: "Dallas, TX",
    priority: 3,
    rating: 3.9,
    dateTime: "06/11/2021",
  },
  {
    id: 10,
    name: "Linda Anderson",
    location: "San Jose, CA",
    priority: 1,
    rating: 4.6,
    dateTime: "07/11/2021",
  },
];

const UserLeads = ({}) => {
  const renderData = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        //add code here
        router.push("client/leads/leadDetails");
      }}
    >
      <View style={{ padding: 16 }}>
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 14, lineHeight: 16, fontWeight: "600" }}>
            {item.name}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 8,
              alignItems: "center",
            }}
          >
            <EvilIcons name="location" size={16} color="black" />
            <Text style={{ fontSize: 14, lineHeight: 16, marginLeft: 4 }}>
              {item.location}
            </Text>
          </View>
          <Text>{`Priority: ${item.priority}`}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>{`Rating: ${item.rating}`}</Text>
          <Text>
            <Text
              style={{
                fontStyle: "italic",
                fontWeight: "700",
                fontSize: 14,
                lineHeight: 16,
              }}
            >
              {`Added on`}{" "}
            </Text>
            <Text
              style={{
                fontSize: 14,
                lineHeight: 16,
                fontWeight: "300",
                fontStyle: "italic",
              }}
            >
              {`${item.dateTime}`}
            </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView />
      <StatusBar translucent />
      <View style={{ flex: 1 }}>
        <FlatList
          data={sampleData}
          renderItem={renderData}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: "#dbdbdb" }} />
          )}
        />
      </View>
    </View>
  );
};

export default UserLeads;
