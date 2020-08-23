import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Modal,StyleSheet,Button } from 'react-native';
import { Card, Icon, Rating,Input} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {postFavorite, postComment } from '../redux/ActionCreator';

const mapStateToProps = state => {
    return{
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites,
        
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId,rating,author,comment) => dispatch(postComment(dishId,rating,author,comment)),
})




function RenderDish(props){
    const dish = props.dish;
    if (dish!=null){
        return(
            <View>
            <Card
            featuredTitle={dish.name}
            image={{uri: baseUrl+ dish.image}}
            >
            <Text style={{margin: 10}}>
                {dish.description}
            </Text>
            <View style={{flex:1,flexDirection:'row',alignContent :'center'}}>
            <Icon 
                raised
                reverse
                name={props.favorite ? 'heart' : 'heart-o'}
                type='font-awesome'
                color='#f50'
                onPress={()=> props.favorite ? console.log('Already favorite'): props.onPress()}
            />
            <Icon 
                raised
                name='pencil'
                type='font-awesome'
                color='#512DA8'
                reverse
                onPress={()=>props.handlingComment()}
            />
            </View>
            </Card>
            </View>
        );
    }
    else{
        return(
            <View></View>
        );
    }
}

function RenderComments(props){
    const comments=props.comments;

    const renderCommentItem = ({item,index}) =>{
        return(
            <View key={index} style={{margin:10}}>
                <Text style={{fontSize:14}}>
                    {item.comment}
                </Text>
                <Text style={{fontSize:12}} >
                    {item.rating} Stars
                </Text>
                <Rating 
                startingValue={item.rating}
                readonly true
                imageSize={14}
                style={{
                    flex:1,
                    flexDirection:'row'
                }}
                />
                <Text style={{fontSize:12}}>
                    {'-- ' + item.author + ', ' + item.date}
                </Text>
            </View>
        );
    }

    return(
        <Card title='Comments'>
            <FlatList 
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
                />
        </Card>
    );
}


class DishDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            showModal:false,
            itemId:'',
            dishId:'',
            author: '',
            comment: '',
            rating:0,
            date:'',

        }
    }
    
    handleComment(dishId,rating,author,comment){
        console.log(dishId+" "+rating+" "+author+" "+comment);
        this.props.postComment(dishId,this.state.rating,this.state.author,this.state.comment);
    }

    handlingComment() {
        this.toggleModal();
    }

    toggleModal(){
        this.setState({showModal: !this.state.showModal})
        }

    resetForm(){
        this.setState({
            showModal:false,
            itemId:'',
            dishId:'',
            author: '',
            comment: '',
            rating:0,
            date:'',
        });
    }
    
    

    markfavorite(dishId){
        this.props.postFavorite(dishId);
    }

    static navigationOptions ={
        title:'Dish Detail\'s'
    }

render(){
    const dishId= this.props.navigation.getParam('dishId','')

        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                    favorite={this.props.favorites.some(el=> el === dishId)}
                    onPress={()=> this.markfavorite(dishId)}
                    handlingComment={()=> this.handlingComment()}
                />
                <RenderComments 
                comments={this.props.comments.comments.filter((comment) => comment.dishId===dishId)}
                />
                <Modal
            animationType={'slide'}
            tranparent={false}
            visible={this.state.showModal}
            onDismiss={()=> {
                this.toggleModal(); 
                this.resetForm()
            }}
            onRequestClose={()=> {
                this.toggleModal();
                this.resetForm()
                }}
            >
            <View style={styles.modal}>
                <Text style={styles.modalTitle}>
                    Adding Comment
                </Text>
                <Rating 
                showRating
                startingValue={0}
                onFinishRating={(rating)=>this.setState({rating: rating})}
                />
                <Input
                placeholder="Author"
                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                style={styles.modalInput}
                onChangeText={(value) => this.setState({author: value})}
                />
                <Input
                placeholder="Comment"
                leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                style={styles.modalInput}
                onChangeText={(value) => this.setState({comment: value})}
                />
                <Button
                onPress={()=> {
                    //const commentid= this.props.comments.comments.filter((comment) => comment.id)[0] 
                    this.handleComment([+dishId][0],this.state.rating,this.state.author,this.state.comment);
                    this.toggleModal(); 
                    this.resetForm()
                }
                
                }
                color='#512DA8'
                title='Submit'
                
                >
                </Button>
                <Button
                onPress={()=> {
                    this.toggleModal(); 
                    this.resetForm()
                }
                }
                color='grey'
                title='Cancel'
                >
                </Button>
            </View>
            </Modal>
                
            </ScrollView>
       );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);

const styles= StyleSheet.create({
    modal:{
        justifyContent:'center',
        margin:20,
    
    },
    modalTitle:{
        fontSize:24,
        fontWeight:'bold',
        backgroundColor:'#512DA8',
        textAlign:'center',
        color:'white',
        marginTop:20,
        marginBottom: 20,
    },
    modalInput:{
        fontSize:18,
        margin:10,
    },
});
