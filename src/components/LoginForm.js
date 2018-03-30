import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, AsyncStorage} from 'react-native';
import {Card, CardSection, Button, InputField, Spinner } from './common';
import {loginAttempt, editForm} from '../actions';

class LoginForm extends Component {
  componentWillMount(){
    AsyncStorage.getItem('TightSchedule', (err, result) => {
      if (err) console.log(err);
      if (result) {
        const {login} = JSON.parse(result);
        this.props.loginAttempt({email: login.email, password: login.password});
      }
    });
  }
  render (){
    const {email, password, loading,
          error, editForm, loginAttempt} = this.props;
    return (
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
    );
  }
}

const mapState = ({auth}) => {
  const {email, password, loading, error } = auth;
  return {email, password, loading, error};
};
export default connect(mapState, {loginAttempt, editForm})(LoginForm);
