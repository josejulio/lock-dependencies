import { getProgram } from '../Program';
import { UpgradeStrategy } from '../../core/UpgradeStrategy';

describe('src/cli/Program', () => {
    it('Uses default values', () => {
        expect(getProgram()).toMatchObject({
            packageJson: 'package.json',
            upgradeStrategy: UpgradeStrategy.LOCK,
            ignoreLockedDependencies: false
        });
    });
});
