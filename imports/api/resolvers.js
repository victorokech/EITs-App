import { GraphQLDateTime } from "graphql-iso-date";
import { EITS } from "./eits";

const resolvers = {
    Date: GraphQLDateTime,
    Query: {
        getOneEit(_, args) {
            return EITS.findOne(args.id);
        },
        getEits() {
            return EITS.find({}).fetch(function (error) {
                if (error)
                    return "There was an error. Please try again";
            });
        }
    },
    Mutation: {
        insertEit(_, args) {
            const id = EITS.insert({
                firstname: args.firstname,
                lastname: args.lastname,
                gender: args.gender,
                dob: args.dob,
                createdAt: new Date(),
                owner: "gyC6pSRb2WyWtZ2dw",
                username: "victorokech"
            });
            
            return EITS.findOne(id)
        },
        deleteEit(_, args) {
            /* EITS.remove(args.id);
            return "Deleted Eit " + args.id; */
            Meteor.call('eit.remove', args.id, function (error) {
                if (error)
                    return "There was a problem. Please try again" + error;
            });
            
            return "Deleted EIT " + args.id;
        },
        updateEit(_, args) {

            Meteor.call('eit.update', args.id, args, function (error)  {
                if (error)
                    return "There was a problem. Please try again" + error;
            });
            
            return args
        }
    }
}

export default resolvers;