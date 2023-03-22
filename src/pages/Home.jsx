import { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableNativeFeedback,
} from "react-native";
import { getMovie } from "../api/request";
import Icon from "react-native-vector-icons/FontAwesome";
import { MaterialIcons } from "@expo/vector-icons";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

export default function Home({ navigation }) {
  const [movie, setMovie] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [inputYear, setInputYear] = useState("");
  const [inputName, setInputName] = useState("");
  
  async function search() {
    try {
      const result = await getMovie(inputName, inputYear);
      setMovie(result);
      setInputName("");
      setInputYear("");
    } catch (e) {
      console.log(`Erro: ${e.message}`);
    }
  }
  async function saveToFavorite() {
    try {
      const list = [...movieList];
      const storage = useAsyncStorage("storage");
      list.push(...list, movie);
      setMovieList([...new Set(list)]);
      await storage.setItem(JSON.stringify(list));
      alert("Adicionado aos favoritos");
      console.log(list);
    } catch (e) {
      console.log(e);
    }
  }

  function hasMovie(item, list) {
    return list.contains(item);
  }

  return (
    <ScrollView>
      <View>
        <TextInput
          placeholder="Digite o nome do filme"
          value={inputName}
          onChangeText={(newText) => setInputName(newText)}
          style={styles.input}
        />
        <TextInput
          placeholder="Digite o ano do filme"
          value={inputYear}
          onChangeText={(newText) => setInputYear(newText)}
          style={styles.input}
        />
        <View style={{ margin: 10 }}>
          <Button style={styles.button} title="Buscar filme" onPress={search} />
        </View>
        <View style={{ margin: 10 }}>
          <Button
            style={styles.button}
            title="Favoritos"
            onPress={() => navigation.navigate("Favorites")}
          />
        </View>
      </View>
      {movie ? (
        <>
          <TouchableNativeFeedback
            onPress={() => navigation.navigate("Details", movie)}
          >
            <View style={styles.view}>
              <Image
                source={{
                  uri: movie.Poster,
                }}
                style={{ width: 345, height: 500 }}
              />
            </View>
          </TouchableNativeFeedback>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginVertical: 10,
            }}
          >
            <Text style={styles.text}>{movie.Title}</Text>
            <MaterialIcons
              name="star-outline"
              size={30}
              onPress={saveToFavorite}
              color="green"
            />
          </View>
        </>
      ) : (
        <Text>Nenhum filme encontrado</Text>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    height: 40,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    marginVertical: 5,
  },
  text: {
    fontSize: 26,
    textAlign: "center",
  },
  view: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },
});
