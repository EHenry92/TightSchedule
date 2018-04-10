import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, AsyncStorage, View, Image} from 'react-native';
import {Card, CardSection, Button, InputField, Spinner, Header} from './common';
import {loginAttempt, editForm} from '../actions';

class LoginForm extends Component {
  componentWillMount(){
    AsyncStorage.getItem('TightSchedule-Login', (err, result) => {
      if (err) console.log(err);
      else if (result) {
        const {login} = JSON.parse(result);
        this.props.loginAttempt({email: login.email, password: login.password});
      }
    });
  }
  render (){
    const {email, password, loading,
          error, editForm, loginAttempt} = this.props;
    const {containerStyle, imageStyle, imgCardStyle, titleStyle, titleContainerStyle} = styles;
    return (
    <View style={containerStyle}>
      <Card style={imgCardStyle}>
      <Image
          style={imageStyle}
          source={require('./imgs/logo.png')}
        />
        <View style={titleContainerStyle}>
        <Text style={titleStyle}>
        Login/ Signup
      </Text>
        </View>
      </Card>
      <Card>
        <CardSection>
          <InputField
            label = "Email"
            onChangeText = {(text) => editForm({email: text})}
            value = {email}
            placeholder = "example@email.com"
          />
        </CardSection>
        <CardSection>
        <InputField
            label = "Password"
            onChangeText = {(text) => editForm({password: text})}
            value = {password}
            placeholder = "password"
            secureTextEntry
          />
        </CardSection>
        {
          !!error &&
          <Text style={{color: 'red', fontSize: 20}}>
            {error}
          </Text>
        }
        <CardSection>
         {
           loading ?
          <Spinner size="large" />
           :
          <Button onPress= {() => loginAttempt({email, password})}>
            Enter
          </Button>
         }
        </CardSection>
      </Card>
    </View>
    );
  }
}

const mapState = ({auth}) => {
  const {email, password, loading, error } = auth;
  return {email, password, loading, error};
};
export default connect(mapState, {loginAttempt, editForm})(LoginForm);


const styles = {
  containerStyle: {
    flex:1
  },
  imageStyle : {
    width: 200,
    height:200,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 30,
    backgroundColor: 'white',
    alignSelf: 'center',
    padding: 5
  },
  imgCardStyle: {
    // backgroundColor:'#38647c'
  },
  titleStyle: {
    fontSize: 30
  },
  titleContainerStyle:{
    backgroundColor: 'white',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 2
  }
}
