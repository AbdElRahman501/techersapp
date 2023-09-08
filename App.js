import React from "react";
import { useFonts } from "expo-font";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { Provider } from 'react-redux';
import store from "./store";
import MainComponents from "./MainComponents";


const App = () => {
  const [fontsLoaded] = useFonts({
    "Montserrat-Arabic": require("./assets/fonts/Montserrat-Arabic-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <Provider store={store}>
        <ApplicationProvider {...eva} theme={eva.light}>
          <MainComponents />
        </ApplicationProvider>
      </Provider>

    </>
  );
};
export default App;
