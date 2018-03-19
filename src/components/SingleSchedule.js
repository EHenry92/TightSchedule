import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

class SingleSchedule extends Component {
  render () {
    {schedule} = this.props;
    return (
      <View>
        <Header title={schedule.title}/>
      </View>
    );
  }
};

const mapState = (state, ownProps) => ({
  title: ownProps.schedule.title
});

export default connect(mapState, {})(SingleSchedule);
