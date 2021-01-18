# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.5.4](https://github.com/entrostat/entro-ci/compare/v1.5.3...v1.5.4) (2021-01-18)


### Bug Fixes

* **build:** Removed the reuse of the alias key array ([ccaba99](https://github.com/entrostat/entro-ci/commit/ccaba9907fc0c2e53430b46c62250a8c07f10f08))

### [1.5.3](https://github.com/entrostat/entro-ci/compare/v1.5.2...v1.5.3) (2021-01-18)


### Bug Fixes

* **build:** Added an echo of the output options ([7689792](https://github.com/entrostat/entro-ci/commit/7689792b92b2d900473a071c0b5dbec3ecbf2ca4))

### [1.5.2](https://github.com/entrostat/entro-ci/compare/v1.5.1...v1.5.2) (2021-01-18)


### Bug Fixes

* **build:** Return undefined if the key doesn't exist in the array ([325b6be](https://github.com/entrostat/entro-ci/commit/325b6be034a8a928974b8ffbdf4773cfb5b2d6d1))

### [1.5.1](https://github.com/entrostat/entro-ci/compare/v1.5.0...v1.5.1) (2021-01-08)


### Bug Fixes

* **build:** Corrected Typescript linting errors ([72994dc](https://github.com/entrostat/entro-ci/commit/72994dc7408631b7210d07d8f949029bcbfad35d))

## [1.5.0](https://github.com/entrostat/entro-ci/compare/v1.4.1...v1.5.0) (2021-01-08)


### Features

* **build:** Improved the process that is used to trigger image pushes if the hash is the same but the image name is different ([31cf103](https://github.com/entrostat/entro-ci/commit/31cf10309eaa2d19ee6b8ec5e7ce9c4f344daf5f))

### [1.4.1](https://github.com/entrostat/entro-ci/compare/v1.4.0...v1.4.1) (2021-01-08)


### Bug Fixes

* **build:** Added the image name to the hash so that we can trigger builds on all entro-ci calls even if the hash is the same but the image name is different ([c6c75e1](https://github.com/entrostat/entro-ci/commit/c6c75e131d1e29d541336af6a2e20fa1b58bac4c))
* **build:** Added the node types ([1d4d58f](https://github.com/entrostat/entro-ci/commit/1d4d58fd213b36d7b29be72fe97886ce51f9f9af))

## [1.4.0](https://github.com/entrostat/entro-ci/compare/v1.3.1...v1.4.0) (2021-01-02)


### Features

* **entro-hash:** Added the ability to use Entro Hash to store tokens ([497bed0](https://github.com/entrostat/entro-ci/commit/497bed041fce9f1b5147ddbaa682b2984fce4801))

### [1.3.1](https://github.com/entrostat/entro-ci/compare/v1.3.0...v1.3.1) (2020-11-16)


### Bug Fixes

* **watch-files:** Added a default for the watch files if there are none specified ([ef424fb](https://github.com/entrostat/entro-ci/commit/ef424fb1f9fed77327053f7cb98695603cc3f7db))

## [1.3.0](https://github.com/entrostat/entro-ci/compare/v1.2.0...v1.3.0) (2020-11-15)


### Features

* **watch-files:** Added the ability to watch specific files and trigger a build if they have changed ([5b228cf](https://github.com/entrostat/entro-ci/commit/5b228cf515b5968f96683efe4ad1914db0af1820))

## [1.2.0](https://github.com/entrostat/entro-ci/compare/v1.1.3...v1.2.0) (2020-11-03)


### Features

* **kubernetes:** Added a script to enable a deployment update without the deployment itself changing ([6a324bd](https://github.com/entrostat/entro-ci/commit/6a324bd66f7024f63460202dd84e2abf36fd73e5))

### [1.1.3](https://github.com/entrostat/entro-ci/compare/v1.1.2...v1.1.3) (2020-10-25)


### Bug Fixes

* **hash:** Removed the file name from the hash output ([dadc8dc](https://github.com/entrostat/entro-ci/commit/dadc8dcf1f470792c07a1636aeb1c63d15262d26))

### [1.1.2](https://github.com/entrostat/entro-ci/compare/v1.1.1...v1.1.2) (2020-10-25)


### Bug Fixes

* **builder:** CD into the directory and build from there to ensure that the context is correct ([e2e7206](https://github.com/entrostat/entro-ci/commit/e2e7206f3327e4c146d0799cab01f83a64bdcab6))

### [1.1.1](https://github.com/entrostat/entro-ci/compare/v1.1.0...v1.1.1) (2020-10-25)


### Bug Fixes

* **cli:** Fixed the shortening from eci and left it as entro-ci ([44983b6](https://github.com/entrostat/entro-ci/commit/44983b6b2ca3ab904bc5bc027b7dde56ed83dd29))

## [1.1.0](https://github.com/entrostat/entro-ci/compare/v1.0.1...v1.1.0) (2020-10-25)


### Features

* **docker:** Added the ability to build based on a Docker file (ignoring the contents of the directory for the hash) ([6b64c5d](https://github.com/entrostat/entro-ci/commit/6b64c5d8bbfbcea2385edb95a1a8614fb5d631ab))

### [1.0.1](https://github.com/entrostat/entro-ci/compare/v1.0.0...v1.0.1) (2020-10-25)

## [1.0.0](https://github.com/entrostat/entro-ci/compare/v0.0.0...v1.0.0) (2020-10-25)

## 0.0.0 (2020-10-25)
