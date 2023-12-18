import { StyleSheet, View } from 'react-native'
import React from 'react'
import MonthStateCard from './MonthStateCard'

export default function Analytics() {
  return (
    <View style={styles.container}>
      <MonthStateCard item={{ type: "attendance", score: 90 }} />
      <MonthStateCard item={{ type: "exams", score: 60 }} />
      <MonthStateCard item={{ type: "homework", score: 70 }} />
      <MonthStateCard item={{ type: "total", score: (90 + 60 + 70) / 3 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: "space-evenly",
  },
})