import alt from '../alt';
import DropdownChildActions from '../actions/DropdownChildActions';

class DropdownChildStore {
  constructor() {
    this.bindActions(DropdownChildActions);
    this.children = [{childVal: 'loading...', value: 'loading...', label: 'Loading...'}];
    this.selectedChildren = [];
  }

  onGetChildrenSuccess(blob) {
    this.selectedChildren = blob.transFunc(blob.data);
    this.children = blob.data;
  }

  onGetChildrenFail(jqXhr) {
    console.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    alert('Dropdown Children Fetch failed!');
  }
}

export default alt.createStore(DropdownChildStore);
