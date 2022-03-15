import * as React from 'react';
import { Card, Divider, Paragraph } from 'react-native-paper';
import { Button } from 'react-native-paper';

import { Text, View } from '../components/Themed';
import HomeStyles from '../styles/HomeStyles';

export default function SustainabilityTip(props) {
    return (<Card style={HomeStyles.card}>
          <Card.Title 
            title="Did you know..."
          />
          
          <Card.Content>
            <Paragraph>
                {props.tip}
            </Paragraph>
        
          </Card.Content> 

          <Divider />

          <Card.Content>
            <Button icon="thumb-up" mode="outlined" color = '#000000'>
            Yes
            </Button>
            <Button icon="thumb-down" mode="outlined" color = '#000000'>
            No
            </Button>
          </Card.Content>
        </Card> 
    );
}