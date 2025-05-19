import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { withNavigation } from "react-navigation";

const { width } = Dimensions.get("window");

const CategoriesList = ({ navigation, results }) => {
  return (
    <View style={styles.screen}>
      <FlatList
        numColumns={2}
        data={results.filter((item) =>
          item.image.includes("https://i.imgur.com/")
        )}
        keyExtractor={(item) => item.id.toString()}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.itemContainer}
            onPress={() => {
              navigation.navigate("Product", {
                id: item.id,
                name: item.name,
              });
            }}
          >
            <Image
              style={styles.categoriesImageStyle}
              source={{ uri: item.image }}
              resizeMode="center"
            />
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    top: 10,
  },

  itemContainer: {
    backgroundColor: "#fff",
    width: width / 2 - 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  categoriesImageStyle: {
    width: "100%",
    height: 150,
    top: 10,
  },
  itemText: {
    textAlign: "center",
    padding: 8,
    top: 5,
  },
});

export default withNavigation(CategoriesList);
