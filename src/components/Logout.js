import React from 'react';
import {CardSection, Card, Button} from './common';
import {logout} from '../actions';
import {connect} from 'react-redux';

const Logout = (props) => {
  return (
    <Card>
      <CardSection>
      <Button onPress={() => props.logout()}>
        Logout
      </Button>
      </CardSection>
    </Card>
  );
};

export default connect(null, {logout})(Logout);
