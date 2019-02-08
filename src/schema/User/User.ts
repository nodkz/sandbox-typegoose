import { prop, Typegoose } from 'typegoose';
// import mongoose from 'mongoose';

class Address {
  @prop()
  public city: string;

  @prop()
  public street: string;
}

// @pre<UserModel>('save', function(next) {
//   this.preSave();
//   next();
// })
// @post<UserModel>('save', user => {
//   user.postSave();
// })
class UserModel extends Typegoose {
  @prop({ default: 'ok', required: true })
  public name?: string;

  @prop()
  public createdAt: Date;

  @prop()
  public address: Address;

  public preSave() {}
  public postSave() {}
}

const User = new UserModel().getModelForClass(UserModel);

export { User };
