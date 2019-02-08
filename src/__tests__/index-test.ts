import * as mod from '../index';

describe('my first test', () => {
  it('check mongoose types', () => {
    expect(mod.getMongooseTypeNames()).toEqual({
      ok: { a: 1, b: 2, c: 3 },
      ok2: [1, 2, 5, 9],
    });
  });

  it('error handling', () => {
    expect(mod.maybeError(3)).toBeTruthy();
    expect(mod.maybeError(33)).toBeTruthy();
    expect(() => mod.maybeError(333)).toThrowError(/be less than 100/);
  });

  it('async/await', async () => {
    // https://jestjs.io/docs/en/tutorial-async

    let a = 1;
    const intervalId = setInterval(() => {
      a = a + 1;
    }, 100);

    expect(a).toBeLessThan(2);
    await mod.sleep(500);
    expect(a).toBeGreaterThanOrEqual(5);

    clearInterval(intervalId);
  });

  it('async/await with reject', async () => {
    await expect(mod.maybeReject(123)).rejects.toMatchObject({
      message: expect.stringContaining('be less than 100'),
    });
  });

  it('async/await with reject 2', async () => {
    expect.assertions(1);
    try {
      await mod.maybeReject(123);
    } catch (e) {
      expect(e).toMatchObject({
        message: expect.stringContaining('be less than 100'),
      });
    }
  });

  it('fn.spy manually (dont do that)', async () => {
    let calls = 0;
    const cb = () => {
      calls += 1;
    };
    await mod.sleep(200, cb);
    expect(calls).toBeGreaterThanOrEqual(1);
  });

  it('fn.spy', async () => {
    const cb = jest.fn(() => 666);
    await mod.sleep(30, cb);
    expect(cb).toHaveBeenCalled();
    expect(cb).toHaveBeenCalledWith(30);
    await mod.sleep(40, cb);
    expect(cb.mock.calls).toEqual([[30], [40]]);

    cb.mockClear();
    const res = await mod.sleep(50, cb);
    expect(cb.mock.calls).toEqual([[50]]);
    expect(cb.mock.results).toEqual([{ type: 'return', value: 666 }]);
    expect(res).toBe(666);

    // https://jestjs.io/docs/en/es6-class-mocks
  });
});
