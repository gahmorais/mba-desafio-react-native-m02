import { useEffect, useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { Text, View } from "react-native";
export default function Favorites() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    loadFavoriteMovies();
  }, []);
  function loadFavoriteMovies() {
    const storage = useAsyncStorage("storage");
    storage
      .getItem()
      .then((result) => {
        // setMovies(result);
        const movies = JSON.parse(result);
        movies.map((movie) => console.log(movie.Title,movie.Released));
      })
      .catch((e) => {
        setMovies([]);
        console.log(e);
      });
  }

  return (
    <View>
      <Text>Favoritos</Text>
    </View>
  );
}
