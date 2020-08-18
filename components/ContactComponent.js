import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';

function Contact() {
    return(
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