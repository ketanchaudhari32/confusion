import React, { Component } from 'react';
import { View, FlatList,Text,Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {Loading} from './LoadingComponent';
import Swipeout from 'react-native-swipeout';
import {deleteFavorite} from '../redux/ActionCreator';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return{
        dishes: state.dishes,
        favorites: state.favorites,
    }
}


const mapDispatchToProps = dispatch => ({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
});


class Favorites extends Component{
    
    static navigationOptions={
        title: "My favorites"
    }

    render(){
        const {navigate} = this.props.navigation;

        

        const renderMenuIten = ({item,index})=>{

            const rightButton=[
                {
                    text: 'Delete',
                    type: 'Delete',
                    onPress: ()=>{
                        Alert.alert(
                            'Delete Favorite',
                            'Are you sure you wish to delete the favorite dish '+ item.name+' ?',
                            [
                                {
                                    text:'Cancel',
                                    onPress: ()=> console.log(item.name+' Not Deleted'),
                                    style: 'cancel'
                                },
                                {
                                    text:'Ok',
                                    onPress: ()=> this.props.deleteFavorite(item.id),
                                    
                                }
                            ],
                            {cancelable: false}
                        );
                    }
                }
            ];


            return(
                <Swipeout right={rightButton} autoClose={true}>
                <Animatable.View animation='fadeInRightBig' duration={2000} useNativeDriver={true}>
                    <ListItem 
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    onPress={()=> navigate('DishDetail',{dishId: item.id})}
                    leftAvatar={{source: { uri: baseUrl + item.name}}}
                    
                    />
                </Animatable.View>
                </Swipeout>
            );
        }

        if (this.props.dishes.isLoading) {
            return(
            <Loading/>
            );
        }
        else if (this.props.dishes.errMess){
            return(
                <View>
                    <Text>
                        {this.props.dishes.errMess}
                    </Text>
                </View>
            );
        }
        else{
            return(
                <FlatList 
                    data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
                    renderItem={renderMenuIten}
                    keyExtractor={item => item.id.toString()}
                />
            );
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Favorites);