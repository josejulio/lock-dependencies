import { UpgradeStrategy } from './UpgradeStrategy';
import { assertNever } from './Utils';

export interface SearchVersionOptions {
    upgradeStrategy: UpgradeStrategy;
    ignoreLockedDependencies: boolean
}

export const getSearchVersion = (version: string, options: SearchVersionOptions): string | undefined => {
    const hasModifier = version[0] === '~' || version[0] === '^';
    const normalizedVersion = hasModifier ? version.slice(1, version.length) : version;

    if (options.upgradeStrategy === UpgradeStrategy.LOCK) {
        if (normalizedVersion === version) {
            return undefined;
        }

        return normalizedVersion;
    }

    if (options.ignoreLockedDependencies && version === normalizedVersion) {
        return undefined;
    }

    switch (options.upgradeStrategy) {
        case UpgradeStrategy.MAJOR:
            return 'latest';
        case UpgradeStrategy.MINOR:
            return `^${normalizedVersion}`;
        case UpgradeStrategy.PATCH:
            return `~${normalizedVersion}`;
        default:
            assertNever(
                options.upgradeStrategy,
                `Unknown UpdateStrategy ${options.upgradeStrategy}`
            );
    }

};
