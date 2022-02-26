import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    container_left: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      marginLeft: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    left_title:
    {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'left',
    },
    subtitle: {
      fontSize: 16,
    },
      description: {
      fontSize: 14,
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    }
  });