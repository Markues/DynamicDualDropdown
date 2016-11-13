import React from 'react';
import DropdownChildStore from '../stores/DropdownChildStore';
import DropdownChildActions from '../actions/DropdownChildActions';
import {MultiSelect} from 'react-selectize';
import {browserHistory} from 'react-router';
import {_} from 'underscore';

class DropdownChild extends React.Component {
  constructor(props) {
    super(props);
    this.state = DropdownChildStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    DropdownChildStore.listen(this.onChange);
    let transFunc = this.determineSelection(this.props.queryArray);
    DropdownChildActions.getChildren(this.props.childValue, transFunc);
  }

  componentWillReceiveProps(nextProps) {
    // If a new dropdown parent was selected
    if(nextProps.childValue !== this.props.childValue) {
      let transFunc = this.determineSelection(nextProps.queryArray);
      DropdownChildActions.getChildren(nextProps.childValue, transFunc);
    } else {
      let selection = this.determineSelection(nextProps.queryArray);
      this.setState({selectedChildren: selection(this.state.children)});
    }
  }

  componentWillUnmount() {
    DropdownChildStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  determineSelection(queryArray) {
    return function(children) {
      let qaChildrenArray = queryArray.slice(1); // We don't need the first element, it's the parent

      if(qaChildrenArray.length !== 0) {
        return _.filter(children, (child) => {
          return (_.find(qaChildrenArray, (item) => {
            return item === child.value;
          }) !== undefined);
        });
      } else {
        return [];
      }
    }
  }

  render() {
    let self = this;

    return (
      <div className='space-maker'>
        <span><h5>Children</h5></span>
          <MultiSelect
            options = {this.state.children}
            values = {this.state.selectedChildren}
            placeholder = 'Select Children'
            theme = "bootstrap3"
            onValuesChange = {(values) => {
              let newChildren = values === [] ? values : _.map(values, (item) => {
                return item.value.replace(/\./g, "*")
              });
              let newDDString = "";
              if (newChildren.length < 1) {
                newDDString = self.props.queryArray[0];
              }
              else if(newChildren.length == 1) {
                newDDString = self.props.queryArray[0] + "." + newChildren[0];
              }
              else if(newChildren.length > 1) {
                newDDString = self.props.queryArray[0] + ".(" + ((_.reduce(newChildren, (memo, value) => {
                  return memo + value + "|"
                }, "")).slice(0, -1)) + ")";
              }
              let newUri = self.props.updateQueryString("dropdownData", newDDString);

              self.setState({selectedChildren: values});
              browserHistory.push(newUri);
            }}
          />
      </div>
    );
  }
}

export default DropdownChild;
