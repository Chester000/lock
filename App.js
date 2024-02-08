import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';

export default function App() {
  const [buttonColor, setBtnColor] = useState(styles.locked);
  const [pressed, setPressed] = useState([]);
  const [locked, setLocked] = useState(true);

  const code = [2, 1, 3, 2]; //this is the secret code

const clearLock = () => {
    setPressed([]);
    setLocked(true);
    setBtnColor(styles.locked);
}

const keyPress = (btn) => {
    console.log(...pressed, btn);
    setPressed(prev => [...prev, btn]);
}

useEffect(() => {
  const timeout = setTimeout(() => {
    clearLock()
  }, 2000)
  return (() => {
      clearTimeout(timeout); 
      setBtnColor(styles.wait);
    })
});

useEffect(() => {
  if (pressed.length === code.length && code.every((elem, idx) => elem === pressed[idx])) {
      setLocked(false);
      setBtnColor(styles.unlocked);
  } else {
    clearLock();
    // good place to alert the user of failure


  }
}, [pressed])


  return ( 
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <Pressable style={[styles.buttonBox, buttonColor]} onPress={() => { keyPress(1) }} /> 
        <Pressable style={[styles.buttonBox, buttonColor]} onPress={() => { keyPress(2) }} /> 
        <Pressable style={[styles.buttonBox, buttonColor]} onPress={() => { keyPress(3) }} /> 
        <Pressable style={[styles.buttonBox, buttonColor]} onPress={() => { keyPress(4) }} /> 
      </View>
      <Button title='Clear/Lock' onPress={() => clearLock()} />
      <StatusBar style="auto" />
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonBox: {
    height: 70,
    width: 70,
    borderRadius: 5,
    margin: 3,
    padding: 10,
    backgroundColor: 'black',
  },
  locked: { backgroundColor: 'gray', },
  unlocked: { backgroundColor: 'green', },
  wait: { backgroundColor: 'red', },
});
