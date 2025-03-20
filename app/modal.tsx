import { StatusBar } from 'expo-status-bar'
import { Platform, StyleSheet } from 'react-native'
import { Text, View } from '@/components/Themed'

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Legal Disclaimer</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.legal}>
        <Text style={{ paddingBottom: 20 }}>
          This application is an unofficial fan project and is not affiliated with, endorsed, or
          sponsored by Nintendo, Game Freak, or The Pokémon Company.
        </Text>
        <Text style={{ paddingBottom: 20 }}>
          All Pokémon names, images, and related trademarks are the property of their respective
          owners.
        </Text>
        <Text style={{ paddingBottom: 20 }}>
          The content in this app is intended for informational and entertainment purposes only. No
          copyright or trademark infringement is intended.{' '}
        </Text>
        <Text style={{ paddingBottom: 20 }}>
          If you are a rights holder and believe this app violates any intellectual property rights,
          please contact us, and we will take appropriate action.
        </Text>
      </View>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  legal: {
    padding: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
