import React, { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";

import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from "react-native";
import api from "../api/api";

const screenWidth = Dimensions.get("window").width;

const ProductDetailScreen = ({ navigation }) => {
  const id = navigation.getParam("id");
  const [results, setResult] = useState(null);

  const getResults = async () => {
    try {
      const response = await api.get(`/products`);
      const filtered = response.data.find((product) => product.id === id);
      setResult(filtered);
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  useEffect(() => {
    getResults();
  }, []);

  if (!results) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.screen}>
          <View style={styles.imageContainer}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              style={styles.imagesFlat}
              horizontal
              pagingEnabled={true}
              keyExtractor={(_, index) => index.toString()}
              data={results.images}
              renderItem={({ item }) => (
                <View>
                  <Image source={{ uri: item }} style={styles.image} />
                </View>
              )}
            />
          </View>

          <View style={styles.title}>
            <Text style={styles.header}>{results.title}</Text>
          </View>
          <View style={styles.priceStyles}>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>
              ${results.price}
            </Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={{ fontSize: 14 }}>{results.description}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.buttonStyle}>
          <Ionicons name="bag-add-outline" size={24} color="black" />
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Add to Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondButtonStyle}>
          <Feather name="shopping-cart" size={28} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

ProductDetailScreen.navigationOptions = ({ navigation }) => {
  const title = navigation.getParam("title");
  return {
    title: title || "Product Details",
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    paddingBottom: 50,
  },
  centered: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginVertical: 10,
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    marginRight: 15,
    width: screenWidth - 30,
    height: 300,
    borderRadius: 10,
    
  },
  imageContainer: {
    marginLeft: 15,
    marginTop: 10,
    right: 3,
   
  },
  descriptionContainer: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
  priceStyles: {
    alignSelf: "flex-start",
    left: 20,
  },
  buttonsContainer: {
    position: "absolute",
    flexDirection: "row",
    bottom: 50,
    gap: 10,
    marginHorizontal: 10,
  },
  buttonStyle: {
    flex: 3,
    backgroundColor: "#FF6600",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    gap: 10,
  },
  secondButtonStyle: {
    flex: 1,
    backgroundColor: "#FF6600",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductDetailScreen;
