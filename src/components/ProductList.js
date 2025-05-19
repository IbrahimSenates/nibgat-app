import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { withNavigation } from "react-navigation";

const screenWidth = Dimensions.get("window").width;


const ProductList = ({ result, navigation }) => {
  return (
    <FlatList
      style={styles.screen}
      data={result}
      keyExtractor={(item) => item.id.toString()}
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        const imgurImages = item.images?.filter((img) =>
          img.includes("https://i.imgur.com/")
        );

        if (imgurImages.length > 0) {
          return (
            <View style={styles.itemContainer}>
              <View style={styles.imageContainer}>
                <ScrollView
                  pagingEnabled
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.imageScroll}
                >
                  {imgurImages.map((image, index) => (
                    <Image
                      key={index}
                      style={styles.image}
                      source={{ uri: image }}
                      resizeMode="cover"
                    />
                  ))}
                </ScrollView>
              </View>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ProductDetail", {
                    id: item.id,
                    title: item.title,
                  });
                }}
                style={styles.textContainer}
              >
                <View>
                  <Text style={styles.title}>{item.title}</Text>
                </View>

                <View style={{ bottom: 30 }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                      color: "#FE7743",
                    }}
                  >
                    ${item.price}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }
      }}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FDFBEE",
  },
  screen: {
    backgroundColor: "#FFFDF6",
    flex: 1,
  },
  itemContainer: {
    height: 150,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 10,
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    marginLeft: 10,
    right: 5,
  },
  textContainer: {
    flex: 1,
    height: 160,
    justifyContent: "space-around",
    alignItems: "flex-start",
    marginRight: 50,
    paddingLeft: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  imageScroll: {
    gap: 10,
    paddingHorizontal: 10,
    justifyContent: "flex-start",
  },
  image: {
    width:  screenWidth * 0.36,
    height:  screenWidth * 0.36 ,
    borderRadius: 10,
    marginHorizontal:3
  },
});

export default withNavigation(ProductList);
