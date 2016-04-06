/**
 * @module ember-flexberry
 */

import Ember from 'ember';

/**
 * Service to work with user settings on server.
 *
 * @class DetailInterationService
 * @extends Ember.Service
 * @public
 */
export default Ember.Service.extend({
  /**
   * Current store to request records.
   *
   * @property store
   * @public
   * @type DS.Store
   */
  store: Ember.inject.service('store'),

  /**
   * Flag: indicates wether to use user settings service (if `true`) or not (if `false`).
   *
   * @property isUserSettingsServiceEnabled
   * @public
   * @type Boolean
   * @default false
   */
  isUserSettingsServiceEnabled: false,

  /**
   * It saves user settings.
   *
   * @method saveUserSetting
   * @public
   *
   * @param {Object} [options] Options.
   * @param {String} options.moduleName Name of module for what setting is saved.
   * @param {String} options.userSetting User setting data to save.
   * @param {String} options.settingName Setting name to save as.
   */
  saveUserSetting: function(options) {
    if (!this.get('isUserSettingsServiceEnabled')) {
      return;
    }

    let methodOptions = Ember.merge({
      moduleName: undefined,
      userSetting: undefined,
      settingName: undefined
    }, options);

    let moduleName = methodOptions.moduleName;
    let userSetting = methodOptions.userSetting;
    let settingName = methodOptions.settingName;

    Ember.assert('Module name is not defined for user setting saving.', moduleName);
    Ember.assert('User setting data are not defined for user setting saving.', userSetting);
    Ember.assert('Setting name is not defined for user setting saving.', settingName);

    let store = this.get('store');
    this._getExistingRecord(moduleName, settingName).then(
      function(foundRecord) {
        if (!foundRecord) {
          foundRecord = store.createRecord('flexberry-user-setting');
          foundRecord.set('moduleName', moduleName);
          foundRecord.set('settName', settingName);
        }

        foundRecord.set('txtVal', JSON.stringify(userSetting));
        foundRecord.save();
      }
    );
  },

  /**
   * It gets user setting from server by setting's and module's names.
   *
   * @method getUserSetting
   *
   * @param {Object} [options] Parameters for user setting getting.
   * @param {String} options.moduleName Name of module to search by.
   * @param {String} options.settingName Setting name to search by.
   * @return {Promise} A promise. It returns found result or `undefined` if there is no such setting.
   */
  getUserSetting: function(options) {
    if (!this.get('isUserSettingsServiceEnabled')) {
      return new Ember.RSVP.Promise(function(resolve){
        resolve(undefined);
      });
    }

    let methodOptions = Ember.merge({
      moduleName: undefined,
      settingName: undefined
    }, options);

    let moduleName = methodOptions.moduleName;
    let settingName = methodOptions.settingName;

    Ember.assert('Module name is not defined for user setting getting.', moduleName);
    Ember.assert('Setting name is not defined for user setting getting.', settingName);

    return this._getExistingRecord(moduleName, settingName).then(
      function(foundRecord) {
        if (foundRecord) {
          let userSettingValue = foundRecord.get('txtVal');
          if (userSettingValue) {
            return JSON.parse(userSettingValue);
          }
        }

        return undefined;
      }
    );
  },

  /**
   * It looks for already created user settings records.
   *
   * @method _getExistingRecord
   * @private
   *
   * @param {Object} moduleName Module name of looked for record.
   * @param {String} settingName Setting name of looked for record.
   * @return {Promise} A promise. It returns found record or `undefined` if there is no such setting.
   */
  _getExistingRecord: function(moduleName, settingName) {
    // TODO: add search by username.
    let store = this.get('store');
    let modelName = 'flexberry-user-setting';
    let adapter = store.adapterFor(modelName);
    let filterString = adapter.getLimitFunction({
      operation: 'and',
      arguments: [
        {
          operation: '=',
          arguments: ['moduleName', moduleName]
        },
        {
          operation: '=',
          arguments: ['settName', settingName]
        }
      ]
    });
    let limitFunctionQuery = adapter.getLimitFunctionQuery(filterString, 'FlexberryUserSettingE');

    let query = {};
    Ember.merge(query, limitFunctionQuery);
    Ember.merge(query, { $top: 2 });

    return store.query(modelName, query).then(function(result) {
      if (result) {
        let foundRecords = result.get('content');
        if (Ember.isArray(foundRecords) && foundRecords.length > 0) {
          if (foundRecords.length === 1) {
            return foundRecords[0];
          }

          throw new Error(
            `More than one record for module '${moduleName}' and setting '${settingName}' was found.`);
        }
      }

      return undefined;
    });
  }
});
