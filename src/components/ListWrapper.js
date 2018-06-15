import React, {Component} from 'react';
import {View, Text, ListView} from 'react-native';
import {Header, ListItem} from './common';

const ListWrapper = (listTitle, WrappedComponent, sortFunction) =>
  class extends Component {
    componentDidMount() {
      this.createDataSource(this.props.listData.sort(sortFunction));
    }
    componentWillReceiveProps(nextProps) {
      if (sortFunction)  {
      this.createDataSource(nextProps.listData.sort(sortFunction));
      }
      else {
        this.createDataSource(nextProps.listData);
      }
    }

    createDataSource(data) {
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      this.dataSource = ds.cloneWithRows(data)
    }

    renderRow(info) {
    return <ListItem
              style={{marginBottom: 2}}
              rowData={info.listTitle}
            />
    }
    render () {
      return (
       <WrappedComponent {...this.props} data={this.dataSource} listTitle={listTitle}/>
      )
    }

  };

const styles = {
  listHeaderStyle: {
    marginTop: 0,
    paddingTop:0,
    height: 25,
    backgroundColor: 'rgba(0,33,115,0.2)',
    justifyContent: 'center'
  }

}

export default ListWrapper;
