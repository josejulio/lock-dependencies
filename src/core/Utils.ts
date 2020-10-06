export const assertNever = (arg: never, msg?: string): never => {
    throw new Error(msg ?? `Unexpected argument ${arg}`);
};
