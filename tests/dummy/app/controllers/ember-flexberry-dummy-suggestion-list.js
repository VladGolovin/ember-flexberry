import ListFormController from 'ember-flexberry/controllers/list-form';

export default ListFormController.extend({
  /**
    Name of related edit form route.

    @property editFormRoute
    @type String
    @default 'ember-flexberry-dummy-suggestion-edit'
   */
  editFormRoute: 'ember-flexberry-dummy-suggestion-edit',

  exportExcelProjection: 'SuggestionL'
});
