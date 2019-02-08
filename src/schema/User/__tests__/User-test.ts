import { User } from '../';
import { initMongo } from '../../../../bin/jest-mongo';

initMongo();

beforeEach(async () => {
  await User.collection.remove({});
});

describe('', () => {
  it('test mongod', async () => {
    expect(await User.countDocuments()).toBe(0);

    expect(
      await User.create({
        name: '123',
      })
    );

    const u = new User();
    u.name = '567';
    await u.save();

    expect(await User.countDocuments()).toBe(2);

    expect(await User.find()).toMatchObject([
      { __v: 0, _id: expect.anything(), name: '123' },
      { __v: 0, _id: expect.anything(), name: '567' },
    ]);
  });

  it('demo tests', async () => {
    const u = new User({ name: 'JohnDoe' });
    await u.save();
    const user = await User.findOne();

    expect(user).toBeInstanceOf(User);
    if (user) {
      expect(user.name).toBe('JohnDoe');
      expect(user).toMatchObject({
        __v: 0,
        _id: expect.anything(),
        name: 'JohnDoe',
      });
    }
  });
});
