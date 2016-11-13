import alt from '../alt';

class DropdownChildActions {
  constructor() {
    this.generateActions(
      'getChildrenSuccess',
      'getChildrenFail'
    );
  }

  getChildren(childValue, transFunc) {
    $.ajax({url: '/api/dropdown/child/' + childValue})
      .done((data) => {
        this.actions.getChildrenSuccess({data: data, transFunc: transFunc})
      })
      .fail((jqXhr) => {
        this.actions.getChildrenFail(jqXhr)
      });
  }
}

export default alt.createActions(DropdownChildActions);
