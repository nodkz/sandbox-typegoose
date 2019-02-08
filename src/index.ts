// mongoose.connect("mongodb://localhost:27017/test");

export function getMongooseTypeNames() {
  return {
    ok: { a: 1, b: 2, c: 3 },
    ok2: [1, 2, 5, 9],
  };
}

export function maybeError(a: number) {
  if (a > 100) throw new Error('Argument must be less than 100');

  return true;
}

export async function sleep(ms: number, cb?: (waitedTime: number) => any) {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve(cb ? cb(ms) : null);
    }, ms)
  );
}

export async function maybeReject(a: number) {
  if (a > 100) throw new Error('Argument must be less than 100');

  return true;
}
