import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Accounts } from 'meteor/accounts-base';

import { EITS } from './eits.js';
import { assert } from 'chai';

if (Meteor.isServer) {
    describe('EITS', () => {
        describe('methods', () => {
            let userId = Random.id();
            let eitId;
            let firstname = 'Test',
                lastname = 'User',
                gender = 'Male',
                dob = '1st January',
                createdAt = new Date(),
                owner = 'gyC6pSRb2WyWtZ2dw',
                username = 'victorokech';

            before(() => {
                Meteor.users.remove({});
                const newUser = Accounts.createUser({ username: "test", email: "test@email.com", password: "password" });
            })

            beforeEach(() => {
                EITS.remove({});
                eitId = EITS.insert({
                    firstname: 'Test',
                    lastname: 'User',
                    gender: 'Male',
                    dob: '1st January',
                    createdAt: new Date(),
                    owner: userId,
                    username: 'tmeasday',
                });                
            });

            // can insert eit
            it('can insert eit', () => {
                // internal implementation of task insert method
                const insertEit = Meteor.server.method_handlers['eit.insert'];

                // set up fake method invocation
                const invocation = {};

                assert.throws(function () {
                    insertEit.apply(invocation, [firstname, lastname, gender, dob, createAt, ownder, username]);
                }, Meteor.Error, 'not-authorized');

                assert.equal(EITS.find().count(), 1);
            });

            // cannot insert eit if not logged in
            it('cannot insert eit if not logged in', () => {
                // internal implementation of eit insert method
                const insertEit = Meteor.server.method_handlers['eit.insert'];

                const newUserId = Meteor.users.findOne({}, { username: 'test', email: 'test@email.com' })._id;

                // set up fake method invocation
                const invocation = { 'this.userId': newUserId };

                assert.throws(function () {
                    insertEit.apply(invocation, [firstname, lastname, gender, dob, createAt, ownder, username]);
                }, Meteor.Error, 'not-authorized');

                assert.equal(EITS.find({ _id: eitId }).count(), 0);
            });

        });
    });
}