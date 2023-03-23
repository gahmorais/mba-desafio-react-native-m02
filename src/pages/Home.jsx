import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableNativeFeedback,
} from "react-native";
import { getMovie } from "../api/request";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import CustomButton from "../components/CustomButton";
import FavoriteIcon from "../components/FavoriteIcon";

export default function Home({ navigation }) {
  const [movie, setMovie] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [inputYear, setInputYear] = useState("1999");
  const [inputName, setInputName] = useState("matrix");

  useEffect(() => {
    async function loadFavoriteMovies() {
      try {
        const storage = useAsyncStorage("storage");
        const result = await storage.getItem();
        if (result) {
          const movies = JSON.parse(result);
          setMovieList(movies);
        }
      } catch (e) {
        setMovieList([]);
        console.log(e);
      }
    }
    loadFavoriteMovies();
  }, []);

  async function searchMovie() {
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
      let list = [...movieList];
      const storage = useAsyncStorage("storage");
      if (movieList.includes(movie)) {
        list = movieList.filter((item) => item.imdbID !== movie.imdbID);
      } else {
        list.push(movie);
      }
      list.map((item) => console.log(item.Title));
      setMovieList(list);
      await storage.setItem(JSON.stringify(list));
    } catch (e) {
      console.log(e);
    }
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
          <CustomButton action={searchMovie}>Buscar filme</CustomButton>
        </View>
        <View style={{ margin: 10 }}>
          <CustomButton action={() => navigation.navigate("Favorites")}>
            Favoritos
          </CustomButton>
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
            <FavoriteIcon
              isFavorite={movieList.includes(movie)}
              action={saveToFavorite}
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
