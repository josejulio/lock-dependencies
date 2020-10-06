import { Command } from 'commander';

import { UpgradeStrategy } from '../core/UpgradeStrategy';

export const getProgram = () => {
    const program = new Command();

    program
    .description('Utility to help lock and upgrade dependencies of package.json file. Not meant to be automated but to help on the process.')
    .option(
        '-p, --package-json <package-json-path>',
        'Path to package.json file',
        'package.json'
    )
    .option(
        '-u, --upgrade-strategy <lock|patch|minor|major>',
        'Defines how to upgrade the packages: \n'
        + '- lock: Only lock to current version\n'
        + '- patch: Upgrades to latest patch version\n'
        + '- minor: Upgrades to latest minor version\n'
        + '- major: Upgrades to latest major version\n',
        (val: string): UpgradeStrategy => {
            switch (val.toUpperCase()) {
                case UpgradeStrategy.LOCK:
                case UpgradeStrategy.PATCH:
                case UpgradeStrategy.MINOR:
                case UpgradeStrategy.MAJOR:
                    return val.toUpperCase() as unknown as UpgradeStrategy;
            }

            throw new Error(`Unknown upgrade-strategy ${val}`);
        },
        UpgradeStrategy.LOCK
    )
    .option(
        '-i, --ignore-locked-dependencies',
        'Ignore the dependencies that are already locked',
        false
    );

    return program;
};
