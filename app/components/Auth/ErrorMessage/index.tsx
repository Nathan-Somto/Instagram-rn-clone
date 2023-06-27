import { StyleSheet, Text} from 'react-native'
import React from 'react'
import { typographyStyles } from '../../../constants'
type props ={
    children: React.ReactNode
}
export default function ErrorMessage({children}:props) {
  return (
      <Text style={[styles.error,typographyStyles.xs]}>
        {children}
      </Text>
 )
}
 
const styles = StyleSheet.create({
    error: {
        color: "red",
        marginTop: 5,
      },
})