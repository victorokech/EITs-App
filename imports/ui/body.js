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
    },
});

Template.body.events({
    'submit .new-eit'(event) {
        event.preventDefault();
        // get eit data from form and save
        const target = event.target;

        var id = target.id.value;

        console.log(id);

        var eits = {
            firstname: target.firstname.value,
            lastname: target.lastname.value,
            gender: target.gender.value,
            dob: target.dob.value
        };

        if (!id) {
            Meteor.call('eit.insert', eits);
        } else {
            Meteor.call('eit.update', id, eits);
        }
        // clear form
        target.reset();
    },
    'click .btn-edit'() {
        const edit = document.querySelector('.new-eit');

        // getting eit to edit
        edit.firstname.value = this.firstname;
        edit.lastname.value = this.lastname;
        edit.gender.value = this.gender;
        edit.dob.value = this.dob;
        edit.id.value = this._id;


        edit.submit.innerHTML = "Update";

    },
    'click .btn-delete'() {
        Meteor.call('eit.remove', this._id);
    },
});