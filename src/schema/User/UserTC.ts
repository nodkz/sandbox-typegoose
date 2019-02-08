import { User } from './User';
import { composeWithMongoose } from 'graphql-compose-mongoose';

const UserTC = composeWithMongoose(User);
// console.log(UserTC.getFieldNames());
// console.log(UserTC.getFieldTC('abc').getFieldNames());

export { UserTC };
