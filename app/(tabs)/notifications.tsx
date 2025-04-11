import { View, Text, FlatList } from "react-native";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader } from "@/components/Loader";
import { styles } from "@/styles/notifications.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import Notification from "@/components/Notification";

const Notifications = () => {
  const notifications = useQuery(api.notifications.getNotifications);

  if (notifications === undefined) return <Loader></Loader>;
  if (notifications.length === 0)
    return <NoNotificationsFound></NoNotificationsFound>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <FlatList
        data={notifications}
        renderItem={({ item }) => <Notification notifications={item} />}
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      ></FlatList>
    </View>
  );
};

export default Notifications;

function NoNotificationsFound() {
  return (
    <View style={[styles.container, styles.centered]}>
      <Ionicons
        name="notifications-outline"
        size={48}
        color={COLORS.primary}
      ></Ionicons>
      <Text style={{ fontSize: 20, color: COLORS.white }}>
        No notifications yet
      </Text>
    </View>
  );
}
