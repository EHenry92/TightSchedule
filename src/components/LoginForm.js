import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, AsyncStorage, View, Image} from 'react-native';
import {Card, CardSection, Button, InputField, Spinner} from './common';
import {loginAttempt, editForm} from '../actions';
import colors from '../style/colors';
import {unBordered, screenView, textureStyle} from '../style';

class LoginForm extends Component {
  componentDidMount(){
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
    const {containerStyle, imageStyle, imgCardStyle, titleStyle, titleContainerStyle, buttonView} = styles;
    return (
    <View style={screenView}>
    <Image
        resizeMode="cover"
        source={require('./imgs/concrete-texture.jpg')}
        style={textureStyle}/>
      <Card style={imgCardStyle}>
        <Image
            style={imageStyle}
            source={require('./imgs/logo.png')}
          />
      </Card>
      <Card style={{flex:2}}>
        <View style={titleContainerStyle}>
          <Text style={titleStyle}>
          Login/ Signup
          </Text>
        </View>
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
          <View style= {unBordered}>
          {
            loading ?
            <Spinner size="large" />
            :
            <Button
              onPress= {() => loginAttempt({email, password})}
              >
              Enter
            </Button>
          }
          </View>
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
  imageStyle : {
    width: 180,
    height:180,
    borderWidth: 2,
    borderColor: colors.navy,
    borderRadius: 30,
    alignSelf: 'center',
    padding: 5
  },
  imgCardStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    flex:1,
    backgroundColor: colors.highlightColorTransparent,
  },
  titleStyle: {
    fontSize: 30
  },
  titleContainerStyle:{
    backgroundColor: colors.mainBackgroundColor,
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    elevation: 2,
    borderColor: colors.outlineColor,
    borderBottomWidth: 4
  }
}
