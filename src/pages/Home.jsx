import { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { getMovie } from "../api/request";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home({ navigation }) {
  const [movie, setMovie] = useState("");
  const [input, setInput] = useState("");

  async function search() {
    try {
      const result = await getMovie(input);
      setMovie(result);
    } catch (e) {
      console.log(`Erro: ${e.message}`);
    }
  }

  return (
    <ScrollView>
      <View>
        <TextInput
          placeholder="Digite o nome do filme"
          value={input}
          onChangeText={(newText) => setInput(newText)}
          style={styles.input}
        />
        <Button style={styles.button} title="Buscar filme" onPress={search} />
      </View>
      {movie ? (
        <View style={styles.view}>
          <Image
            source={{
              uri: movie.Poster,
            }}
            style={{ width: 345, height: 500 }}
          />
          <Text style={styles.text}>{movie.Title}</Text>
        </View>
      ) : (
        <Text>Nenhum filme encontrado</Text>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  input: {
    fontSize:18,
    height: 40,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius:10
  },
  button: {
    margin: 1,
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
