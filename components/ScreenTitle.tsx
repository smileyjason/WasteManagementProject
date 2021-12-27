import * as React from 'react';
import styles from '../styles/ScreenStyles';
import { StyleSheet } from 'react-native';


import { Text, View } from './Themed';

import { IconButton, Button, Dialog, Portal, Paragraph  } from 'react-native-paper';

type TitleProps = {
    title: string,
    subtitle: string,
    helpMessage: string
}

const titleStyles = StyleSheet.create({
    container: {
        width: "100%",
        minWidth: "100%",
        justifyContent:"center",
        alignItems: 'center',
    },
    rowcontainer: {
        flexDirection: 'row',
        justifyContent:"center",
        alignItems: 'center',
        width: "100%",
        minWidth: "100%",
    },
    row: {
        justifyContent:"center",
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    text: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
  });
  
  
export default function ScreenTitle(props: TitleProps) {
  const [help, setHelp] = React.useState(false);

  return (
    <View style={titleStyles.container}>
        <View style={titleStyles.rowcontainer}>

            {/* Title text */} 
            <View style={titleStyles.row}>
                <Text style={styles.title}>{props.title}</Text>
            </View>

            {/* Help button */} 
            <View style={titleStyles.row}>
                <IconButton
                    icon="help"
                    size={20}
                    onPress={() => setHelp(true)}
                />
            </View>

        </View>

        <View style={titleStyles.text}>
            <Text style={styles.subtitle}>{props.subtitle}</Text>
        </View>

        {/* Seperator */} 
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        {/* Dialog */} 
        <Portal>
            <Dialog visible={help} onDismiss={() => setHelp(false)}>
            <Dialog.Content>
                <Paragraph> {props.helpMessage} </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={() => setHelp(false)}>Ok</Button>
            </Dialog.Actions>
            </Dialog>
        </Portal>
    </View>
  );
}