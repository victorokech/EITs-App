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

var ids = [];

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
        
        // change back submit button
        target.submit.innerHTML = "Submit";
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
    'change .eitcheckbox'() {
        var id = this._id;
        if (event.target.checked) {
            ids.push(id);
        } else {
            ids.splice(ids.indexOf(id), 1);
        }
        console.log(ids);
        // console.log(event.target.checked);

        document.querySelector('.bulkdelete').innerHTML = '<button class="btn btn-bulkdelete">Delete</button>';
    },
    'click .btn-bulkdelete'(event) {
        // get checked checkboxes ids
        for (let i = 0; i < ids.length; i++) {
            var _id = ids[i];
            Meteor.call('eit.remove', _id);
            console.log(_id);
        }
    }
});