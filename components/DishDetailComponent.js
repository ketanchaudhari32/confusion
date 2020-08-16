import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';


function RenderDish(props){
    const dish = props.dish;
    
    if (dish!=null){
        return(
            <Card
            featuredTitle={dish.name}
            image={require('./images/uthappizza.png')}
            >
            <text style={{margin: 10}}>
                {dish.description}
            </text>
            </Card>
        );
    }
    else{
        return(
            <View></View>
        );
    }
}


function Dishdetail(props){
    return(
         <RenderDish dish={props.dish} />
    );
}

export default Dishdetail;
