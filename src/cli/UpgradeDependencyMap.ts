import { getSearchVersion } from '../core/Version';
import { upgradeDependency } from '../core/UpgradeDependency';
import { Options } from '../main';

export type DependencyProcessedData = {
    type: 'started';
} | {
    type: 'finished';
    needsSaving: boolean;
}
export type DependencyProcessedCallback = (name: string, version: string, data: DependencyProcessedData) => void;
export type DependencyMap = Record<string, string>;

export const upgradeDependencyMap = async (dependencies: DependencyMap | undefined, options: Options, processed: DependencyProcessedCallback) => {
    if (dependencies) {
        for (const [ name, version ] of Object.entries(dependencies)) {
            processed(name, version, {
                type: 'started'
            });
            const searchVersion = getSearchVersion(version, options);
            if (searchVersion) {
                const upgradedVersion = await upgradeDependency(name, searchVersion);
                if (upgradedVersion !== version) {
                    dependencies[name] = upgradedVersion;
                    processed(name, version, {
                        type: 'finished',
                        needsSaving: true
                    });
                    continue;
                }
            }

            processed(name, version, {
                type: 'finished',
                needsSaving: false
            });
        }
    }
};
