import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "@/styles/notifications.styles";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image } from "expo-image";
import { formatDistanceToNow } from "date-fns";

export default function Notification({ notifications }: any) {
  return (
    <View style={styles.notificationItem}>
      <View style={styles.notificationContent}>
        <Link href={`/notifications`} asChild>
          {/*/user/${notifications.sender._id}*/}
          <TouchableOpacity style={styles.avatarContainer}>
            <Image
              source={notifications.sender.image}
              style={styles.avatar}
              contentFit="cover"
              transition={200}
            ></Image>
            <View style={styles.iconBadge}>
              {notifications.type === "like" ? (
                <Ionicons name="heart" size={14} color={"#8B5CF6"}></Ionicons>
              ) : notifications.type === "follow" ? (
                <Ionicons
                  name="person-add"
                  size={24}
                  color={"#eB82F6"}
                ></Ionicons>
              ) : (
                <Ionicons
                  name="chatbubble"
                  size={14}
                  color={"#3B82F6"}
                ></Ionicons>
              )}
            </View>
          </TouchableOpacity>
        </Link>

        <View style={styles.notificationInfo}>
          <Link href={"/notifications"} asChild>
            <TouchableOpacity>
              <Text style={styles.username}>
                {notifications.sender.username}
              </Text>
            </TouchableOpacity>
          </Link>

          <Text style={styles.action}>
            {notifications.type === "follow"
              ? "started following you"
              : notifications.type === "like"
                ? "liked your post"
                : `commented: "${notifications.comment}"`}
          </Text>
          <Text style={styles.timeAgo}>
            {formatDistanceToNow(notifications._creationTime, {
              addSuffix: true,
            })}
          </Text>
        </View>
      </View>

      {notifications.post && (
        <Image
          source={notifications.post.imageUrl}
          style={styles.postImage}
          contentFit="cover"
          transition={200}
        ></Image>
      )}
    </View>
  );
}
