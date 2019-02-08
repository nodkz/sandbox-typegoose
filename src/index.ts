import { prop, Typegoose, pre, post } from "typegoose";
// import * as mongoose from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";

// mongoose.connect("mongodb://localhost:27017/test");

class Abc {
  @prop()
  a: string;

  @prop()
  b: number;
}

@pre<User>("save", function(next) {
  // this.preSave();
  next();
})
@post<User>("save", function(user) {
  // user.postSave();
})
class User extends Typegoose {
  @prop({ default: "ok", required: true })
  name?: string;

  @prop()
  ok: Date;

  @prop()
  abc: Abc;
}

const UserModel = new User().getModelForClass(User);

// UserModel is a regular Mongoose Model with correct types
async () => {
  const u = new UserModel({ name: "JohnDoe" });
  await u.save();
  const user = await UserModel.findOne();

  if (user) {
    user.name;
  }

  // prints { _id: 59218f686409d670a97e53e0, name: 'JohnDoe', __v: 0 }
  console.log(user);
};

const UserTC = composeWithMongoose(UserModel);
console.log(UserTC.getFieldNames());
console.log(UserTC.getFieldTC("abc").getFieldNames());
