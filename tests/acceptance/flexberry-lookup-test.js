import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | flexberry lookup');
/*
test('visiting flexberry-lookup', function(assert) {
  assert.expect(3);

  visit('components-acceptance-tests/flexberry-lookup/settings-example');

  andThen(function() {

    let expandAnimationCompleted = new Ember.RSVP.Promise((resolve, reject) => {

      assert.equal(currentURL(), 'components-acceptance-tests/flexberry-lookup/settings-example');

      let $lookupButtouChoose = Ember.$('.lookup-choose-button');

      Ember.run(() => {
        $lookupButtouChoose.click();
      });

      Ember.run(() => {
        var done = assert.async();
        setTimeout(function() {

          let $modal = Ember.$('.flexberry-modal');
          let $modalHeader = Ember.$('.header');

          assert.strictEqual($modal.length === 1, true, 'Component open flexberry-modal block');
          assert.strictEqual($modalHeader.text().trim(), 'Temp title', 'Component flexberry-modal has title');

          done();
          resolve();
        }, 200);
      });
    });

    expandAnimationCompleted.then(() => {
      Ember.run(() => {
        let $modalCloseIcon = Ember.$('.close.icon');
        $modalCloseIcon.click();
      });

      Ember.run(() => {
        var endClose = assert.async();
        setTimeout(function() { endClose(); }, 100);
      });
    });
  });
});*/

test('visiting flexberry-lookup autocomplete', function(assert) {
  assert.expect(1);

  visit('components-acceptance-tests/flexberry-lookup/settings-example-autocomplete');

  andThen(function() {

    let expandAnimationCompleted = new Ember.RSVP.Promise((resolve, reject) => {

      assert.equal(currentURL(), 'components-acceptance-tests/flexberry-lookup/settings-example-autocomplete');

      let $lookupButtouChoose = Ember.$('.lookup-choose-button');

      Ember.run(() => {
        $lookupButtouChoose.click();
      });

      Ember.run(() => {
        var done = assert.async();
        setTimeout(function() {

          let $modal = Ember.$('.flexberry-modal');

          done();
          resolve();
        }, 200);
      });
    });

    expandAnimationCompleted.then(() => {
      Ember.run(() => {
        let $modalCloseIcon = Ember.$('.close.icon');
        $modalCloseIcon.click();
      });

      Ember.run(() => {
        var endClose = assert.async();
        setTimeout(function() { endClose(); }, 100);
      });
    });
  });
});

/*
test('set title', function(assert) {
  assert.expect(2);

  visit('components-acceptance-tests/flexberry-lookup/base-operations');

  andThen(function() {

    let expandAnimationCompleted = new Ember.RSVP.Promise((resolve, reject) => {

      let $lookupButtouChoose = Ember.$('.lookup-choose-button');
      let $ = Ember.$('.lookup-choose-button');
      assert.equal(currentURL(), 'components-acceptance-tests/flexberry-lookup/base-operations');

      Ember.run(() => {
        $lookupButtouChoose.click();
      });

      Ember.run(() => {
        var done = assert.async();
        setTimeout(function() {

          let $modal = Ember.$('.flexberry-modal');
          let $modalTitle = $modal.children('.header');
          let $modalField = $modal.children('tr');


          assert.strictEqual($modalTitle.text().trim(), 'Temp title', 'Component\'s container has title \'Temp title\' text');

          done();
          resolve();

        }, 100);
      });
    });

    expandAnimationCompleted.then(() => {
      Ember.run(() => {
        let $modalCloseIcon = Ember.$('.close.icon');
        $modalCloseIcon.click();
      });

      Ember.run(() => {
        var endClose = assert.async();
        setTimeout(function() { endClose(); }, 100);
      });
    });
  });
});*/