import { StyleSheet, View } from 'react-native'
import React from 'react'
import ScoreItem from './ScoreItem'
import t from '../actions/changeLanguage'

export default function Analytics() {
  return (
    <View style={styles.container}>
      <ScoreItem title={t("attendance")} score={80} />
      <ScoreItem title={t("homework")} score={79} />
      <ScoreItem title={t("exams")} score={90} />
      <ScoreItem title={t("total")} score={80} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: "space-evenly",
    alignItems: "baseline",
  },
})