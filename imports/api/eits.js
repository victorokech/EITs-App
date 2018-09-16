import {
    Meteor
} from 'meteor/meteor';
import {
    Mongo
} from 'meteor/mongo';

export const EITS = new Mongo.Collection('eits');

Meteor.methods({
    'eit.insert'(eits) {
        EITS.insert({
            eits
        });
    }
});