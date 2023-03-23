import { useEffect, useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
export default function Favorites({ navigation }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function loadFavoriteMovies() {
      try {
        const storage = useAsyncStorage("storage");
        const result = await storage.getItem();
        if (result) {
          const movies = JSON.parse(result);
          setMovies(movies);
        }
      } catch (e) {
        setMovies([]);
        console.log(e);
      }
    }
    loadFavoriteMovies();
  }, []);

  let showMovies = null;
  if (movies.length > 0) {
    showMovies = (
      <FlatList
        data={movies}
        keyExtractor={(item) => item.imdbID}
        numColumns={2}
        renderItem={({ item }) => {
          console.log(item);
          return (
            <TouchableNativeFeedback
              onPress={() => {
                navigation.navigate("Details", item);
              }}
            >
              <View
                style={{
                  flexGrow: 1,
                  margin: 5,
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <Image
                  source={{
                    uri: item.Poster,
                  }}
                  style={{ width: 180, height: 300 }}
                />
                <Text style={{ textAlign: "center", fontSize: 20 }}>
                  {item.Title}
                </Text>
              </View>
            </TouchableNativeFeedback>
          );
        }}
      />
    );
  } else {
    showMovies = (
      <View style={styles.withoutMovies}>
        <AntDesign name="meh" size={44} color="black" />
        <Text style={styles.textWithoutMovies}>Não há favoritos</Text>
      </View>
    );
  }
  return showMovies;
}

const styles = StyleSheet.create({
  withoutMovies: {
    display: "flex",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    justifyContent: "center",
    alignItems: "center",
  },
  textWithoutMovies: {
    fontSize: 30,
    marginTop: 30,
  },
});
