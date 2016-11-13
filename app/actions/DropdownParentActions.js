import alt from '../alt';

class DropdownParentActions {
  constructor() {
    this.generateActions(
      'getParentsSuccess',
      'getParentsFail',
      'updateSelected'
    );
  }

  getParents() {
    $.ajax({url: '/api/dropdown/parents'})
      .done((data) => {
        this.actions.getParentsSuccess(data)
      })
      .fail((jqXhr) => {
        this.actions.getParentsFail(jqXhr)
      });
  }

  exampleClicked(updateQueryString, event) {
    let targetText = event.target.text;
    this.actions.updateSelected({targetText: targetText, updateQueryString: updateQueryString});
  }
}

export default alt.createActions(DropdownParentActions);
