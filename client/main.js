import '/imports/startup/client';
import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';

Meteor.startup(function () {
    var language = 'en';
    TAPi18n.setLanguage(language)
    .done(function () {
        console.log(`Set language: ${language}`);
    })
    .fail(function (error_message) {
        console.log(error_message);
    });
});