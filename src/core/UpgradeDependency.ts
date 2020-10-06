import * as pacote from 'pacote';

export const upgradeDependency = async (name: string, version: string): Promise<string> => {
    return pacote.manifest(`${name}@${version}`).then(m => m.version);
};
