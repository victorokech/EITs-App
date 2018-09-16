import {
    Meteor
} from "meteor/meteor";
import {
    Template
} from 'meteor/templating';
import {
    ReactiveDict
} from 'meteor/reactive-dict';
import {
    EITS
} from '../api/eits.js';

import './eit.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
});

Template.body.helpers({
    eits() {
        return EITS.find({});
    }
});

Template.body.events({
    'submit .new-eit'(event) {
       // get eit data from form and save
        const target = event.target;
        var eits = { firstname: target.firstname.value, lastname: target.lastname.value, gender: target.gender.value, dob: target.dob.value };

        Meteor.call('eit.insert', eits);

        // clear form
        target.eits.value = '';
    }
});