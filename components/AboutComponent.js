import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { LEADERS } from '../shared/leaders';
import { ListItem } from 'react-native-elements';


function History() {
    return (
        <Card
            title='Our History'
        >
            <View>
                <Text style={{ padding: 5 }}>
                    Started in 2010, Ristorante con
                    Fusion quickly established itself
                    as a culinary icon par excellence in
                    Hong Kong. With its unique brand of world
                    fusion cuisine that can be found nowhere else,
                    it enjoys patronage from the A-list clientele in Hong Kong.
                    Featuring four of the best three-star Michelin chefs in the world
                    , you never know what will arrive on your plate the next time you visit us.
            </Text>
                <Text style={{ paddingTop: 20, padding: 5 }}>
                    The restaurant traces its humble beginnings
                    to The Frying Pan, a successful chain started
                    by our CEO, Mr. Peter Pan, that featured for
                    the first time the world's best cuisines in a pan.
            </Text >
            </View>

        </Card>
    );
}



class AboutDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leaders: LEADERS
        };
    }

    static navigationOptions = {
        title: 'About Us',
        headerTitleStyle: { textAlign: 'left' },

    }

    render() {

        const RenderLeadersCard = () => {
            return (

                <Card title='Corporate Leadership'>
                    <FlatList
                        data={this.state.leaders}
                        renderItem={Leaders}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>

            );
        }

        const Leaders = ({ item, index }) => {
            return (
                <ListItem
                    key={index}
                    title={
                        <Text style={{ fontWeight: 'bold' }}>
                            {item.name}
                        </Text>
                    }
                    subtitle={item.description}
                    hideChevron={true}
                    leftAvatar={{ source: require('./images/alberto.png') }}
                />
            );
        };

        return (
            <ScrollView>
                <History />
                <RenderLeadersCard />
            </ScrollView>
        );
    }


}


export default AboutDetail;