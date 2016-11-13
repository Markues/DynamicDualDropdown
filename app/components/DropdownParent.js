import React from 'react';
import {SimpleSelect} from 'react-selectize';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import DropdownChild from './DropdownChild';
import DropdownParentStore from '../stores/DropdownParentStore';
import DropdownParentActions from '../actions/DropdownParentActions';
import {browserHistory} from 'react-router';
import {_} from 'underscore';

class DropdownParent extends React.Component {
  constructor(props) {
    super(props);
    this.state = DropdownParentStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    DropdownParentStore.listen(this.onChange);
    DropdownParentActions.getParents();
  }

  componentWillReceiveProps(nextProps) {
    let newSelectedParent = this.determineSelection(this.state.parents, nextProps.queryArray);

    this.setState({selectedParent: newSelectedParent});
  }

  componentWillUnmount() {
    DropdownParentStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  determineSelection(parents, queryArray) {
    let parentVal = queryArray[0];

    if(parentVal !== "") {
      return _.find(parents, (parent) => {
        return parent.value === parentVal;
      });
    } else {
      return undefined;
    }
  }

  render() {
    let self = this;

    return (
      <td className='col-xs-3'>
        <SimpleSelect
          options = {this.state.parents}
          placeholder='Select Parent'
          theme = "bootstrap3"
          onValueChange = {(value) => {
            let newParent = value === undefined ? "" : value.value.replace(/\./g, "*");
            let newUri = self.props.updateQueryString("dropdownData", newParent);

            self.setState({selectedParent: value});
            browserHistory.push(newUri);
          }}
          value={this.state.selectedParent}
        />
      {function() {
        if(self.state.selectedParent !== undefined) {
          if(self.state.selectedParent.childFile !== '') {
            return <DropdownChild
                      childValue={self.state.selectedParent.childFile}
                      queryArray={self.props.queryArray}
                      updateQueryString={self.props.updateQueryString}
                    />
          }
        } else {
          return (
            <div className="space-maker">
              <span><h6>Example Parent Selections</h6></span>
              <ListGroup>
                <ListGroupItem onClick={DropdownParentActions.exampleClicked.bind(this,
                  self.props.updateQueryString)} href="#">Example 1</ListGroupItem>
                <ListGroupItem onClick={DropdownParentActions.exampleClicked.bind(this,
                  self.props.updateQueryString)} href="#">Example 2</ListGroupItem>
                <ListGroupItem onClick={DropdownParentActions.exampleClicked.bind(this,
                  self.props.updateQueryString)} href="#">Example 3</ListGroupItem>
              </ListGroup>
            </div>
          )
        }
      }()}
      </td>
    );
  }
}

export default DropdownParent;
