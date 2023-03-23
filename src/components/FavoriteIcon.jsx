import { MaterialIcons } from "@expo/vector-icons";
export default function FavoriteIcon({ isFavorite, action }) {
  return isFavorite ? (
    <MaterialIcons
      name="star"
      size={30}
      onPress={action}
      color="green"
    />
  ) : (
    <MaterialIcons
      name="star-outline"
      size={30}
      onPress={action}
      color="green"
    />
  );
}
