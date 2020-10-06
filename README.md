# lock-dependencies
Lock your package.json dependencies and helps to upgrade them on demand.

If you manually update your dependencies and lock them (i.e. you don't use semver tilde `~` or caret `^`) then this package is for you.

This command line utility will take care of locking and updating on-demand, by default it updates all your dependencies 
(also devDependencies and peerDependencies) to the last minor version of your current version. If you are on 4.y.z it 
will upgrade the dep to the last y and z, but won't touch the 4. This behavior is configurable.

## Usage

You can use directly from `npx`, install it globally or as a `devDependency`. The examples show here are with `npx` for
convenience.

This won't modify any lock file. It will only update the `package.json` and you are left to use your
favorite tool or make any other changes.

You can check the help of it by running with `--help`

```
npx dependencies --help
Utility to help lock and upgrade dependencies of package.json file. Not meant to be automated but to help on the process.

Options:
  -p, --package-json <package-json-path>           Path to package.json file (default: "package.json")
  -u, --upgrade-strategy <lock|patch|minor|major>  Defines how to upgrade the packages: 
  - lock: Only lock to current version
  - patch: Upgrades to latest patch version
  - minor: Upgrades to latest minor version
  - major: Upgrades to latest major version
   (default: "LOCK")
  -i, --ignore-locked-dependencies                 Ignore the dependencies that are already locked (default: false)
  -h, --help                                       display help for command
```

## Examples

Each example will show the result of the command executed on the following `package.json`:
```package.json
{
  "name": "foobar",
  "dependencies": {
    "@babel/runtime": "^7.2.0",
    "lodash": "4.14.2"
  },
  "devDependencies": {
    "dotenv": "~8.2.0"
  },
  "peerDependencies": {
    "react": "15.3.2"
  }
}
```



### Locks dependencies on current dir

`npx lock-dependencies`

```package.json
{
  "name": "foobar",
  "dependencies": {
    "@babel/runtime": "7.2.0",
    "lodash": "4.14.2"
  },
  "devDependencies": {
    "dotenv": "8.2.0"
  },
  "peerDependencies": {
    "react": "15.3.2"
  }
}
```


### Upgrade and lock dependencies to latest major version on current dir

`npx lock-dependencies --upgrade-strategy major`

```package.json
{
  "name": "foobar",
  "dependencies": {
    "@babel/runtime": "7.11.2",
    "lodash": "4.17.20"
  },
  "devDependencies": {
    "dotenv": "8.2.0"
  },
  "peerDependencies": {
    "react": "16.13.1"
  }
}
```

### Upgrade and lock dependencies to latest minor version on ./packages/foo-bar/package.json

`npx lock-dependencies --package-json ./packages/foo-bar/package.json --upgrade-strategy minor`

```package.json
{
  "name": "foobar",
  "dependencies": {
    "@babel/runtime": "7.11.2",
    "lodash": "4.17.20"
  },
  "devDependencies": {
    "dotenv": "8.2.0"
  },
  "peerDependencies": {
    "react": "15.6.2"
  }
}
```

### Upgrade and lock dependencies to latest minor, but do not touch packages already locked

`npx lock-dependencies --upgrade-strategy minor --ignore-locked-dependencies`

```package.json
{
  "name": "foobar",
  "dependencies": {
    "@babel/runtime": "7.11.2",
    "lodash": "4.14.2"
  },
  "devDependencies": {
    "dotenv": "8.2.0"
  },
  "peerDependencies": {
    "react": "15.3.2"
  }
}
```

## Alternatives

You might also check these more complete alternatives:

- [npm-check-updates](https://www.npmjs.com/package/npm-check-updates)
- [npm-check](https://www.npmjs.com/package/npm-check) 

