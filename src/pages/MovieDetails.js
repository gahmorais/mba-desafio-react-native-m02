import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function MovieDetails({ route }) {
  const movieInfo = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{movieInfo.Title}</Text>
      <View style={styles.columnStyle}>
        <Text style={styles.subtitle}>Atores</Text>
        <Text style={styles.text}>{movieInfo.Actors}</Text>
      </View>
      <View style={styles.columnStyle}>
        <Text style={styles.subtitle}>Sinopse</Text>
        <Text style={styles.text}>{movieInfo.Plot}</Text>
      </View>
      <View style={styles.rowStyle}>
        <Text style={styles.subtitle}>Bilheteria</Text>
        <Text style={styles.text}>{movieInfo.BoxOffice}</Text>
      </View>
      <View style={styles.rowStyle}>
        <Text style={styles.subtitle}>Genêro</Text>
        <Text style={styles.text}>{movieInfo.Genre}</Text>
      </View>
      <View style={styles.rowStyle}>
        <Text style={styles.subtitle}>Idiomas</Text>
        <Text style={styles.text}>{movieInfo.Language}</Text>
      </View>
      <View style={styles.rowStyle}>
        <Text style={styles.subtitle}>Classificação</Text>
        <Text style={styles.text}>{movieInfo.Rated}</Text>
      </View>
      <View style={styles.rowStyle}>
        <Text style={styles.subtitle}>Lançamento</Text>
        <Text style={styles.text}>{movieInfo.Released}</Text>
      </View>
      <View style={styles.columnStyle}>
        <Text style={styles.subtitle}>Avaliações</Text>
        {movieInfo.Ratings.map((rate, index) => {
          return (
            <View style={styles.rating} key={index}>
              <Text style={styles.text}>{rate.Source}</Text>
              <Text style={styles.text}>{rate.Value}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#C9EEFF",
  },
  title: {
    fontSize: 30,
    color: "#205295",
    textAlign: "center",
    marginVertical: 20,
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 5,
  },
  rowStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 40,
    marginVertical: 5,
  },
  columnStyle: {
    display: "flex",
    flexDirection: "column",
    marginHorizontal: 40,
  },
  rating: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
});
