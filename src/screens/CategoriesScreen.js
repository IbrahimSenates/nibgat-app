import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import api from "../api/api";
import CategoriesList from "../components/CategoriesList";

const CategoriesScreen = () => {
  const [results, setResults] = useState([]);

  const getResults = async () => {
    try {
      const response = await api.get(`/categories`);
      setResults(response.data);
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  useEffect(() => {
    getResults();
  }, []);

  if (!results) {
    return null;
  }

  return <CategoriesList results={results} />;
};
CategoriesScreen.navigationOptions = {
  title: "Categories",
};

const styles = StyleSheet.create({});

export default CategoriesScreen;
