import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import {isCancel, isInProgress, pick} from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {findCheapestPrice} from './helper/utils';

type Input = {
  n: number;
  edges: number[][];
  start: number;
  end: number;
  expected: number;
};

const App = () => {
  const [input, setInput] = useState<Input | null>(null);

  const handleError = (err: unknown) => {
    if (isCancel(err)) {
      Alert.alert('Error', 'User cancelled the picker');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      Alert.alert(
        'Error',
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  const pickDocument = async () => {
    try {
      const res = await pick({
        allowMultiSelection: false,
        type: ['application/json'],
      });
      readDocumentData(res[0].uri);
    } catch (err) {
      handleError(err);
    }
  };

  const readDocumentData = async (uri: string) => {
    RNFS.readFile(uri, 'ascii')
      .then(res => {
        const d = JSON.parse(res);
        if (
          !d.hasOwnProperty('n') ||
          !d.hasOwnProperty('edges') ||
          !d.hasOwnProperty('start') ||
          !d.hasOwnProperty('end') ||
          !d.hasOwnProperty('expected')
        ) {
          Alert.alert(
            'Error',
            'The selected file does not meet the required format',
          );
          return;
        }
        setInput(d);
      })
      .catch(err => {
        console.log(err.message, err.code);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Question Answer App</Text>

        <TouchableOpacity
          testID="pick-button"
          style={styles.button}
          onPress={pickDocument}>
          <Text style={styles.buttonText}>Upload JSON File</Text>
        </TouchableOpacity>

        {input && (
          <Text>
            Your cheapest price from {input?.start} to {input?.end} is{' '}
            {findCheapestPrice(
              input?.n,
              input?.edges,
              input?.start,
              input?.end,
              input?.expected,
            )}
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  content: {
    fontSize: 16,
    color: '#666',
  },
  error: {
    color: '#ff3b30',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default App;
