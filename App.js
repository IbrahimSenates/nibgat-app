import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import CategoriesScreen from "./src/screens/CategoriesScreen";
import ProductsScreen from "./src/screens/ProductsScreen";
import ProductDetailScreen from "./src/screens/ProductDetailScreen";

const navigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    Product: ProductsScreen,
    ProductDetail: ProductDetailScreen,
  },
  {
    initialRouteName: "Categories",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#FE7743",
      },
    },
  }
);

export default createAppContainer(navigator);
