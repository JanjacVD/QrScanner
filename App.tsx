import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean|null>(null)
  const [scanned, setScanned] = useState(false)
  const[text,setText] = useState('Not scanned yet')

  const getCameraPermission = async() => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == 'granted')
  }
  const handleBarCodeScanned= ({type, data}:{type:any,data:any }) => {
    setScanned(true);
    setText(data)
    console.log(`Type: ${type}, Data:${data}`)
  }
  useEffect(() => {
    getCameraPermission()
  },[])
  if(hasPermission === null){
    return (
      <View style={styles.container}>
        <Text>Requesting permission</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
  if(hasPermission === false){
    return (
      <View style={styles.container}>
        <Text>Camera denied</Text>
        <Button title='Allow camera' onPress={() => getCameraPermission()}/>
        <StatusBar style="auto" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <BarCodeScanner 
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={{height:400, width:400}}
      />
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
