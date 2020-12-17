import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const EITS = new Mongo.Collection('eits');

Meteor.methods({
    'eit.insert'(eits) {
        check(eits, Object);
        // Make sure the user is logged in before inserting a task
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        let id = EITS.insert({
            firstname: eits.firstname,
            lastname: eits.lastname,
            gender: eits.gender,
            dob: eits.dob,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
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
});