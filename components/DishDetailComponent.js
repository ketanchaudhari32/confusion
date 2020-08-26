import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Modal,StyleSheet,Button,Alert, PanResponder } from 'react-native';
import { Card, Icon, Rating,Input} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {postFavorite, postComment } from '../redux/ActionCreator';
import * as Animatable from 'react-native-animatable';

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

    handleViewRef = ref => this.view = ref;

    const recognizeDrag=({moveX,moveY,dx,dy})=>{
        if(dx < -200){
            return true;
        }
        else{
            return false;
        }

    };

    const recognizeComment=({moveX,moveY,dx,dy})=>{
        if(dx > 200){
            return true;
        }
        else{
            return false;
        }

    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e,gestureState)=>{
            return true;
        },
        onPanResponderGrant: () => {
            this.view.rubberBand(1000)
                .then(endState => console.log(endState.finished ? 'finished': 'cancelled'));
        },
        onPanResponderEnd: (e,gestureState) => {
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add to Favorites',
                    'Are you sure you wish to add ' + dish.name+' to the favorites? ',
                    [
                        {
                            text: 'cancel',
                            onPress: ()=> console.log('Cancel pressed'),
                            style: 'cancel'
                        },
                        {
                            text: 'Ok',
                            onPress: ()=> props.favorite ? console.log('Already favorite'): props.onPress()
                        }
                    ],
                    {cancelable: false}
                );
             if (recognizeComment(gestureState))
                props.handlingComment();
            
            return true;
            
            
        }
    });


    if (dish!=null){
        return(
            <View>
            <Animatable.View animation='fadeInDown' duration={2000} delay={1000} useNativeDriver={true}
                ref={this.handleViewRef}
               {...panResponder.panHandlers}
            >
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
            </Animatable.View>
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
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000} useNativeDriver={true}>
            <Card title='Comments'>
                <FlatList 
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                    />
            </Card>
        </Animatable.View>
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
