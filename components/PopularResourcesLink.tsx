import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import { IconButton } from "react-native-paper";

interface Props {
    title: string;
    websiteTitle: string;
    blurb: string;
    onPress: () => void;
}

const styles = StyleSheet.create({
    parentBox: {
        backgroundColor: '#b4b4b4',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    contentBox: {
        width: '95%',
        paddingTop: '5px',
        paddingBottom: '10px',
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: '4.5%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    blurb: {
        fontSize: 16,
    },
    nestedBox: {
        display: 'flex',
        flexDirection : 'row',
        justifyContent: 'space-between',
        backgroundColor: '#616161',
        alignItems: 'center',
        width: '95%',
    },
    websiteTitleWrapper: {
        maxWidth: '95%',
        marginLeft: 0,
        paddingLeft: '10px'
    },
    arrowButtonWrapper: {
        maxWidth: '20%',
        marginRight: 0,
        padding: '5px'
    },
    arrowButton: {
        borderRadius: 50,
        backgroundColor: '#f9f9f9',
    },
    textContainer: {
        paddingBottom: '5px',
    }
});

const PopularResourcesLink: FC<Props> = (props) => {
    return (
        <View style={styles.parentBox}>
            <View style={styles.contentBox}>
                <View style={styles.textContainer}>
                    <View>
                        <Text style={styles.title}>{props.title}</Text>
                    </View>
                    <View>
                        <Text style={styles.blurb}>{props.blurb}</Text>
                    </View>
                </View>
                <View style={styles.nestedBox}>
                    <View style={styles.websiteTitleWrapper}>
                        <Text>{props.websiteTitle}</Text>
                    </View>
                    <View style={styles.arrowButtonWrapper}>
                        <IconButton 
                            icon="arrow-right"
                            color="white"
                            onPress={() => {console.log("Pressed")}}
                            size={20}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

export default PopularResourcesLink;
