import { existsSync, readFileSync, writeFileSync } from 'fs';
import * as cliProgress from 'cli-progress';
import { UpgradeStrategy } from './core/UpgradeStrategy';
import { getProgram } from './cli/Program';
import { DependencyMap, DependencyProcessedCallback, upgradeDependencyMap } from './cli/UpgradeDependencyMap';

export interface Options {
    packageJson: string;
    upgradeStrategy: UpgradeStrategy
    ignoreLockedDependencies: boolean;
}

interface PackageJson {
    dependencies?: DependencyMap;
    devDependencies?: DependencyMap;
    peerDependencies?: DependencyMap;
}

const getDependenciesLength = (packageJson: PackageJson) => {
    let count = 0;
    count += Object.keys(packageJson.dependencies ?? {}).length;
    count += Object.keys(packageJson.devDependencies ?? {}).length;
    count += Object.keys(packageJson.peerDependencies ?? {}).length;

    return count;
};

export const execute = async (options: Options) => {
    if (!existsSync(options.packageJson)) {
        throw new Error(`Unable to find: ${options.packageJson}`);
    }

    let needsSaving = false;
    const packageJson = JSON.parse(readFileSync(options.packageJson).toString()) as unknown as PackageJson;
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    progressBar.start(getDependenciesLength(packageJson), 0);
    const processed: DependencyProcessedCallback = (name, version, data) => {
        if (data.type === 'finished') {
            progressBar.increment();
            if (data.needsSaving) {
                needsSaving = true;
            }
        }
    };

    return Promise.all([
        upgradeDependencyMap(packageJson.dependencies, options, processed),
        upgradeDependencyMap(packageJson.devDependencies, options, processed),
        upgradeDependencyMap(packageJson.peerDependencies, options, processed)
    ]).then(() => {
        progressBar.stop();
        if (needsSaving) {
            writeFileSync(
                options.packageJson,
                JSON.stringify(packageJson, null, 2) + '\n'
            );
        }
    });
};

if (require.main === module) {
    const program = getProgram();
    program.parse(process.argv);
    execute(program as unknown as Options);
}
