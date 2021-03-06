/**
  @module ember-flexberry
*/

import Ember from 'ember';

/**
  Mixin for [Ember.Controller](http://emberjs.com/api/classes/Ember.Controller.html) to support hierarchical mode into {{#crossLink "FlexberryObjectlistviewComponent"}}{{/crossLink}}.

  @class FlexberryObjectlistviewHierarchicalControllerMixin
  @uses <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Ember.Mixin.create({
  /**
    Flag indicate whether component is in hierarchical mode.

    @property inHierarchicalMode
    @type Boolean
    @default false
  */
  inHierarchicalMode: false,

  /**
    Attribute name to hierarchy build.

    @property hierarchicalAttribute
    @type Boolean
  */
  hierarchicalAttribute: undefined,

  actions: {
    /**
      Switch hierarchical mode.

      @method actions.switchHierarchicalMode
    */
    switchHierarchicalMode() {
      this.toggleProperty('inHierarchicalMode');
      this.send('refreshList');
    },

    /**
      Saves attribute name and switches the mode if necessary.

      @method actions.saveHierarchicalAttribute
      @param {String} hierarchicalAttribute Attribute name to hierarchy build.
      @param {Boolean} [refresh] If `true`, then switch hierarchical mode.
    */
    saveHierarchicalAttribute(hierarchicalAttribute, refresh) {
      if (refresh) {
        let currentHierarchicalAttribute = this.get('hierarchicalAttribute');
        if (hierarchicalAttribute !== currentHierarchicalAttribute) {
          this.set('hierarchicalAttribute', hierarchicalAttribute);
          this.send('switchHierarchicalMode');
        }
      } else {
        this.set('hierarchicalAttribute', hierarchicalAttribute);
      }
    },

    /**
      Redirect actions into route.

      @method actions.loadRecords
      @param {String} id Record ID.
      @param {ObjectListViewRowComponent} Instance of {{#crossLink "ObjectListViewRowComponent"}}{{/crossLink}}.
      @param {String} property Property name into {{#crossLink "ObjectListViewRowComponent"}}{{/crossLink}}.
    */
    loadRecords(id, target, property) {
      this.send('loadRecordsById', id, target, property);
    },
  }
});
