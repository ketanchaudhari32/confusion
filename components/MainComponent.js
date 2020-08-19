import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import DishDetail from './DishDetailComponent';
import {View, Platform, Image, StyleSheet, ScrollView,Text} from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation'; 
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import ContactDetail from './ContactComponent';
import AboutDetail from './AboutComponent';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders} from '../redux/ActionCreator';


const mapStateToProps = state => {
    return{
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    fetchPromos: () => dispatch(fetchPromos()),
})


const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu, 
        navigationOptions: ({navigation}) => ({
            headerLeft: <Icon
                name='menu' size={24} color='white'
                onPress= {()=> navigation.toggleDrawer()} 
            />
        })
    },
    DishDetail: { screen: DishDetail },

},{
    initialRouteName:'Menu',
    navigationOptions: {
        headerStyle:{
            backgroundColor: '#512DA8'
        },
        headerTintColor:'#fff',
        headerTitleStyle:{
            color:'#fff'
        }
    }
});

const ContactNavigator = createStackNavigator({
    //Home: { screen: Home },
    ContactDetail: { screen: ContactDetail },

},{
    //initialRouteName:'Home',
    navigationOptions:  ({navigation}) => ({
        headerStyle:{
            backgroundColor: '#512DA8'
        },
        headerTintColor:'#fff',
        headerTitleStyle:{
            color:'#fff'
        },
        headerLeft: <Icon
                name='menu' size={24} color='white'
                onPress= {()=> navigation.toggleDrawer()} 
            />
    })
});

const AboutNavigator = createStackNavigator({
    AboutDetail: { screen: AboutDetail },

},{
    navigationOptions:  ({navigation}) => ({
        headerStyle:{
            backgroundColor: '#512DA8'
        },
        headerTintColor:'#fff',
        headerTitleStyle:{
            color:'#fff',
        },
        headerTitleStyle: { 
            textAlign: 'left'
        },
        headerLeft: <Icon
                name='menu' size={24} color='white'
                onPress= {()=> navigation.toggleDrawer()} 
            />
    })
});


const HomeNavigator = createStackNavigator({
    Home: { screen: Home }

},{
    navigationOptions:  ({navigation}) => ({
        headerStyle:{
            backgroundColor: '#512DA8'
        },
        headerTintColor:'#fff',
        headerTitleStyle:{
            color:'#fff'
        },
        headerLeft: <Icon
                name='menu' size={24} color='white'
                onPress= {()=> navigation.toggleDrawer()} 
            />
        
    })
});

const CustomDrawerContentComponent = (props) => (
       <ScrollView>
       <SafeAreaView style={styles.container}
            forceInset={{top: 'always', horizontal:'never'}}>
            <View style={styles.drawerHeader}>
                <View style={{flex:1}}>
                    <Image source={require('./images/logo.png')}
                        style={styles.drawerImage}/>
                </View>
                <View style={{flex:2}}>
                    <Text style={styles.drawerHeaderText}>
                        Ristorante Con Fusion
                    </Text>
                </View>
            </View>
            <DrawerItems {...props}/>
       </SafeAreaView>
   </ScrollView>
)


const MainNavigator = createDrawerNavigator({
    Home: {
        screen: HomeNavigator,
        navigationOptions:{
            title: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor, focused }) =>(
                <Icon 
                    name='home'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            ),
        }
    },
    AboutDetail: {
        screen: AboutNavigator,
        navigationOptions:{
            title:'About Us',
            drawerLabel: 'About Us',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon 
                    name='info-circle'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            ),
        }
    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions:{
            title: 'Menu',
            drawerLabel: 'Menu',
            drawerIcon: ({ tintColor, focused}) => (
                <Icon 
                    name='list'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            ),
            
        }
    },
    Contact: {
        screen: ContactNavigator,
        navigationOptions:{
            drawerLabel: 'Contact Us',
            drawerLabel: 'Contact Us',
            drawerIcon: ({ tintColor, focused}) => (
                <Icon 
                    name='address-card'
                    type='font-awesome'
                    size={22}
                    color={tintColor}
                />
            ),
        }
    }
},{
    drawerBackgroundColor: '#D1C4E9',
    contentComponent: props => <CustomDrawerContentComponent {...props} />
}
);

class Main extends Component{

    componentDidMount(){
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }
    
    render() {
        return(
            <View style={{ flex:1,paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <MainNavigator />
            </View>
        ); 
    }
}        

const styles =StyleSheet.create({
    container:{
        flex:1
    },
    drawerHeader:{
        backgroundColor:'#521DA8',
        height:140,
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        flexDirection:'row'
    },
    drawerHeaderText:{
        color:'white',
        fontSize:24,
        fontWeight:'bold'
    },
    drawerimage:{
        margin:10,
        width:18,
        height:16
    }

});


export default connect(mapStateToProps,mapDispatchToProps)(Main);
