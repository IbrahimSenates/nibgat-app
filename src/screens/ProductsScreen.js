import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import api from "../api/api";
import ProductList from "../components/ProductList";

const ProductsScreen = ({ navigation }) => {
  const [result, setResult] = useState([]);
  const id = navigation.getParam("id"); // Kategori ID
  const name = navigation.getParam("name");

  const getResults = async () => {
    try {
      const response = await api.get(`/products`);
      const filtered = response.data.filter(
        (product) => product.category.id === id
      );
      setResult(filtered);
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  useEffect(() => {
    getResults();
  }, []);

  if (result.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Bu kategoriye ait ürün bulunamadı.</Text>
      </View>
    );
  }

  return <ProductList result={result} />;
};

ProductsScreen.navigationOptions = ({ navigation }) => {
  const name = navigation.getParam("name");
  return {
    title: name || "Products",
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FDFBEE",
  },
  itemBox: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontWeight: "bold",
  },
});

export default ProductsScreen;
