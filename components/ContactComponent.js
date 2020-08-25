import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

function Contact() {
    return(
        <ScrollView>
            <Animatable.View animation='fadeInDown' duration={2000} delay={1000} useNativeDriver={true}>

        <Card
            title='Contact Information'
        >   
        <View>
            <Text style={{padding:5}}>
            121, Clear Water Bay Road
            </Text>
            <Text style={{padding:5}}>
            Clear Water Bay, Kowloon
            </Text >
            <Text style={{padding:5}}>
            HONG KONG
            </Text>
            <Text style={{padding:5}}>
            Tel: +852 1234 5678
            </Text>
            <Text style={{padding:5}}>
            Fax: +852 8765 4321
            </Text >
            <Text style={{padding:5}}>
            Email:confusion@food.net
            </Text>
        </View>

        </Card>
        </Animatable.View>
        </ScrollView>
    );
}

class ContactDetail extends Component{


    render(){

        return(
            <Contact />
        );
    }


}


export default ContactDetail;