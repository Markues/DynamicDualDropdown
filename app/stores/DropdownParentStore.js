import alt from '../alt';
import {_} from 'underscore';
import {browserHistory} from 'react-router';
import DropdownParentActions from '../actions/DropdownParentActions';

class DropdownParentStore {
  constructor() {
    this.bindActions(DropdownParentActions);
    this.parents = [{childFile: 'loading...', value: 'loading...', label: 'Loading...'}];
    this.selectedParent = undefined;
  }

  onGetParentsSuccess(data) {
    this.parents = data;
  }

  onGetParentsFail(jqXhr) {
    console.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    alert('Parent File Fetch failed!');
  }

  onUpdateSelected(data) {
    let clickedItem = _.find(this.parents, function(item) {
      return item.label == data.targetText;
    });

    let newParent = clickedItem.value.replace(/\./g, "*")
    let newUri = data.updateQueryString("dropdownData", newParent);

    this.selectedParent = clickedItem;
    browserHistory.push(newUri);
  }
}

export default alt.createStore(DropdownParentStore);
