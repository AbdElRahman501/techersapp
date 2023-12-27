import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import Header from "../components/Header";
import OBoardingSlides from "../components/OBoardingSlides";
import { Color, globalStyles } from "../GlobalStyles";
import { previousSessionHandler } from "../store/actions/deviceActions";
import AlertModal from "../components/alertModal";
import { useNavigation } from '@react-navigation/core';
import t from "../actions/changeLanguage";

export default function OnboardingPages() {
  const [lastSlide, setLastSlide] = useState(false);
  const [visible, setVisible] = useState(false);
  const [previousSession, setPreviousSession] = useState([])
  const [previousSessionTitle, previousSessionDescription, ok, cancel] = [t("previous session title"), t("previous session description"), t("ok"), t("cancel")]
  const navigation = useNavigation();
  const checkSession = async () => {
    const session = await previousSessionHandler();
    if (session) {
      setVisible(true)
      setPreviousSession(session)
    }
  }
  useEffect(() => {
    checkSession();
  }, [])
  return (
    <SafeAreaView style={[globalStyles.container, { backgroundColor: Color.white, }]}>
      <AlertModal
        visible={visible}
        title={previousSessionTitle}
        content={previousSessionDescription}
        primaryButton={ok}
        secondaryButton={cancel}
        primaryButtonSubmit={() => {
          setVisible(false); navigation.reset({
            index: 0,
            routes: previousSession,
          });
        }}
        secondaryButtonSubmit={() => setVisible(false)}
      />
      <Header lastSlide={lastSlide} />
      <OBoardingSlides setLastSlide={setLastSlide} />
    </SafeAreaView>
  );
};


