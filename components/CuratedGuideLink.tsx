import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import { IconButton } from "react-native-paper";

interface Props {
    title: string;
    onPress: () => void;
}

const styles = StyleSheet.create({
    box: {
        display: 'flex',
        flexDirection : 'row',
        justifyContent: 'space-between',
        backgroundColor: '#b4b4b4',
        alignItems: 'center'
    },
    titleWrapper: {
        maxWidth: '80%',
        marginLeft: 0,
        paddingLeft: '10px',
        paddingBottom: '5px',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    arrowButtonWrapper: {
        maxWidth: '20%',
        marginRight: 0,
        padding: '5px'
    },
    arrowButton: {
        borderRadius: 50,
        backgroundColor: '#f9f9f9',
    }
});

const CuratedGuideLink: FC<Props> = (props) => {
    return (
        <View style={styles.box}>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.arrowButtonWrapper}>
                <IconButton 
                    icon= 'arrow-right'
                    color="white"
                    onPress={() => {console.log("Pressed")}}
                    size={20}
                />
            </View>
        </View>
    );
}

export default CuratedGuideLink;