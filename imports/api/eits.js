import {
    Meteor
} from 'meteor/meteor';
import {
    Mongo
} from 'meteor/mongo';
import {
    check
} from 'meteor/check';


export const EITS = new Mongo.Collection('eits');

Meteor.methods({
    'eit.insert'(eits) {
        EITS.insert({
            firstname: eits.firstname,
            lastname: eits.lastname,
            gender: eits.gender,
            dob: eits.dob
        });
    },
    'eit.update'(id, eits) {
        check(id, String);
        EITS.update(id, eits);
    },
    'eit.remove'(id) {
        check(id, String);
        EITS.remove(id);
    },
    'eit.setChecked'(taskId, setChecked) {
        check(taskId, String);
        check(setChecked, Boolean);

        Tasks.update(taskId, {
            $set: {
                checked: setChecked
            }
        });
    },
});