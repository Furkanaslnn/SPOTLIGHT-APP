import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/feed.styles";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import { STORIES } from "@/constants/mock-data";
import Story from "@/components/Story";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader } from "@/components/Loader";
import Posts from "@/components/Posts";

export default function Index() {
  const { signOut } = useAuth();

  const posts = useQuery(api.posts.getFeedPosts);

  if (posts == undefined) return <Loader></Loader>;
  if (posts.length === 0) return <NoPostsFound></NoPostsFound>;

  const handleSignOut = async () => {
    try {
      await signOut();
      console.log("Sign out successful!");
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>spotlight</Text>
        <TouchableOpacity onPress={() => signOut()}>
          <Ionicons
            name="log-out-outline"
            size={24}
            color={COLORS.white}
          ></Ionicons>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.storiesContainer}
        >
          {STORIES.map((story) => (
            <Story key={story.id} story={story}></Story>
          ))}
        </ScrollView>

        {posts.map((post) => (
          <Posts key={post._id} post={post}></Posts>
        ))}
      </ScrollView>
    </View>
  );
}

const NoPostsFound = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: COLORS.background,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text style={{ fontSize: 20, color: COLORS.primary }}>No posts yet</Text>
  </View>
);
