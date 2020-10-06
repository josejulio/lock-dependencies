import { getSearchVersion } from '../Version';
import { UpgradeStrategy } from '../UpgradeStrategy';

describe('src/core/Version', () => {
    it('removes ~ modifier', () => {
        expect(getSearchVersion('~1.0.0', {
            upgradeStrategy: UpgradeStrategy.LOCK,
            ignoreLockedDependencies: false
        })).toEqual('1.0.0');
    });

    it('removes ^ modifier', () => {
        expect(getSearchVersion('^1.0.0', {
            upgradeStrategy: UpgradeStrategy.LOCK,
            ignoreLockedDependencies: false
        })).toEqual('1.0.0');
    });

    it('works with tags', () => {
        expect(getSearchVersion('~0.5.0-alpha.3', {
            upgradeStrategy: UpgradeStrategy.LOCK,
            ignoreLockedDependencies: false
        })).toEqual('0.5.0-alpha.3');
    });
    it('patch strategy uses ~', () => {
        expect(getSearchVersion('1.0.0', {
            upgradeStrategy: UpgradeStrategy.PATCH,
            ignoreLockedDependencies: false
        })).toEqual('~1.0.0');
    });

    it('minor strategy uses ^', () => {
        expect(getSearchVersion('1.0.0', {
            upgradeStrategy: UpgradeStrategy.MINOR,
            ignoreLockedDependencies: false
        })).toEqual('^1.0.0');
    });

    it('major strategy uses latest', () => {
        expect(getSearchVersion('1.0.0', {
            upgradeStrategy: UpgradeStrategy.MAJOR,
            ignoreLockedDependencies: false
        })).toEqual('latest');
    });

    it('Return undefined if using lock with a version without modifiers', () => {
        expect(getSearchVersion('0.5.0-alpha.3', {
            upgradeStrategy: UpgradeStrategy.LOCK,
            ignoreLockedDependencies: false
        })).toEqual(undefined);
    });

    it('Return undefined if ignoreLockedDependencies with an already locked version', () => {
        expect(getSearchVersion('0.5.0-alpha.3', {
            upgradeStrategy: UpgradeStrategy.MAJOR,
            ignoreLockedDependencies: true
        })).toEqual(undefined);
    });
});
