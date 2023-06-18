# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [5.0.2](https://github.com/entrostat/entro-ci/compare/v5.0.1...v5.0.2) (2023-06-18)


### Bug Fixes

* **logging:** If the message on the exception for ARM buildx config is undefined then output the message ([ce5dcda](https://github.com/entrostat/entro-ci/commit/ce5dcdaf476ad6f76a791548f90b5c3f4b5daf7a))

### [5.0.1](https://github.com/entrostat/entro-ci/compare/v5.0.0...v5.0.1) (2023-06-18)


### Bug Fixes

* **arm:** If the buildx config already exists, allow it to continue ([60f4fcb](https://github.com/entrostat/entro-ci/commit/60f4fcb93b8027ee9be03d10988fe33f778cb03f))

## [5.0.0](https://github.com/entrostat/entro-ci/compare/v4.4.0...v5.0.0) (2023-06-18)


### ⚠ BREAKING CHANGES

* **arm:** Added the ability to build ARM64 containers

### Features

* **arm:** Added the ability to build ARM64 containers ([894ae65](https://github.com/entrostat/entro-ci/commit/894ae6581ffe99c191d6e36b181c4f32d69fddf7)), closes [#7](https://github.com/entrostat/entro-ci/issues/7)

## [4.4.0](https://github.com/entrostat/entro-ci/compare/v4.3.1...v4.4.0) (2023-04-08)


### Features

* **build:** Added the ability to watch a file or files in the build command ([60f0260](https://github.com/entrostat/entro-ci/commit/60f0260119cba96d1a79a1ea8ba5a0843a3ce2ef))

### [4.3.1](https://github.com/entrostat/entro-ci/compare/v4.3.0...v4.3.1) (2023-02-27)


### Bug Fixes

* **devops:** Added the oclif manifest to the gitignore  ([6c03590](https://github.com/entrostat/entro-ci/commit/6c03590ba63709c19477f626126fc2bc83234bd1))

## [4.3.0](https://github.com/entrostat/entro-ci/compare/v4.2.1...v4.3.0) (2023-02-27)


### Features

* **tags:** Added the ability to tag an image as latest with a new flag ([23e64f1](https://github.com/entrostat/entro-ci/commit/23e64f15a16975fda833bbf642270c9eb416091f))


### Bug Fixes

* **devops:** Removed the publish command because we now need otps ([1958f2a](https://github.com/entrostat/entro-ci/commit/1958f2a161292c9a032e8df401793dd03ca7541f))
* **devops:** Run prepack during the release cycle ([980564f](https://github.com/entrostat/entro-ci/commit/980564f5eed8cbc76314bd48e1ca3d51ffbc082f))

### [4.2.1](https://github.com/entrostat/entro-ci/compare/v4.2.0...v4.2.1) (2022-07-19)


### Bug Fixes

* **build:** Only pull the docker image if it exists ([99064fb](https://github.com/entrostat/entro-ci/commit/99064fb40365ae5bd02d30eab6e96687e9b830d3))

## [4.2.0](https://github.com/entrostat/entro-ci/compare/v4.1.1...v4.2.0) (2022-07-19)


### Features

* **docker:** Added the ability to check the manifest instead of pulling the whole image ([d4dd6d6](https://github.com/entrostat/entro-ci/commit/d4dd6d684899b5cc15b680b2a621ed5c8547c78d))

### [4.1.1](https://github.com/entrostat/entro-ci/compare/v4.1.0...v4.1.1) (2022-07-11)


### Bug Fixes

* **formatting:** Removed unneeded imports ([e35de61](https://github.com/entrostat/entro-ci/commit/e35de6197d6eeb559ea4734b5581630025d86f93))

## [4.1.0](https://github.com/entrostat/entro-ci/compare/v4.0.2...v4.1.0) (2022-07-11)


### Features

* **project-version:** Added a command to tell you the project version ([d0808bc](https://github.com/entrostat/entro-ci/commit/d0808bce90ab5080daf39ec3395415a8ad68387e))

### [4.0.2](https://github.com/entrostat/entro-ci/compare/v4.0.1...v4.0.2) (2022-06-20)


### Bug Fixes

* **logger:** Warn when there is an error using the logger because errors exit the CLI ([bb60c1f](https://github.com/entrostat/entro-ci/commit/bb60c1fb174fd92bf2296744a6c7868c520e718a))

### [4.0.1](https://github.com/entrostat/entro-ci/compare/v4.0.0...v4.0.1) (2022-06-20)


### Bug Fixes

* **deps:** Updated the version of class-transformer ([9281a66](https://github.com/entrostat/entro-ci/commit/9281a667ff90873e226b868380195977ae2cff7a))

## [4.0.0](https://github.com/entrostat/entro-ci/compare/v3.1.2...v4.0.0) (2022-06-20)


### Features

* **logging:** Log the output from a command in realtime, don't log it out at the end of an exec call ([85063cf](https://github.com/entrostat/entro-ci/commit/85063cfaffc15a4199cb38991a924edeb93f4783))


### Bug Fixes

* **deps:** Installed the new version of class-transformer and changed plainToClass to plainToInstance ([45445bd](https://github.com/entrostat/entro-ci/commit/45445bd447923f74b8837597b6e72366e9e6220f))
* **devops:** Added the major release command ([512e057](https://github.com/entrostat/entro-ci/commit/512e0573454fd7ba04c0f7609b5e6dc589a278c7))

### [3.1.2](https://github.com/entrostat/entro-ci/compare/v3.1.1...v3.1.2) (2022-03-23)


### Bug Fixes

* **docker-build:** Prevent undefined-latest tag when bulding a non-existent image [#6](https://github.com/entrostat/entro-ci/issues/6) ([4c08c98](https://github.com/entrostat/entro-ci/commit/4c08c986183287df0923503a2abfe019e8cb5a4a))

### [3.1.1](https://github.com/entrostat/entro-ci/compare/v3.1.0...v3.1.1) (2022-02-17)


### Bug Fixes

* **docker-login:** Added the registry to the login command ([9893dd8](https://github.com/entrostat/entro-ci/commit/9893dd812def61af537888510746bdf4cf5a03a3))

## [3.1.0](https://github.com/entrostat/entro-ci/compare/v3.0.3...v3.1.0) (2022-02-17)


### Features

* **docker-login:** Added the ability to login with docker credentials before building [#5](https://github.com/entrostat/entro-ci/issues/5) ([a8df06f](https://github.com/entrostat/entro-ci/commit/a8df06f5e483036a564dee0d37b2aad66dbd0a40))

### [3.0.3](https://github.com/entrostat/entro-ci/compare/v3.0.2...v3.0.3) (2021-11-02)


### Bug Fixes

* **docker-builder:** Allow for the tag to be undefined and if it is then don't tag the image ([2680332](https://github.com/entrostat/entro-ci/commit/26803321844edaf4cde36e3628c7f988036e2cfa))

### [3.0.2](https://github.com/entrostat/entro-ci/compare/v3.0.1...v3.0.2) (2021-09-26)


### Bug Fixes

* **keywords:** Added additional keywords to the entro-ci package ([b2d294d](https://github.com/entrostat/entro-ci/commit/b2d294d1aa77c06f7dbc9e62194d3d784f3aed11))

### [3.0.1](https://github.com/entrostat/entro-ci/compare/v3.0.0...v3.0.1) (2021-09-26)


### Bug Fixes

* **build:** The build was failing with the latest version of globby ([55bbe41](https://github.com/entrostat/entro-ci/commit/55bbe41b2d6325713a5d9b915593c2a3bbe2dc9b))

## [3.0.0](https://github.com/entrostat/entro-ci/compare/v2.6.0...v3.0.0) (2021-09-26)


### Features

* **version:** Added the ability to pack and update the readme during the versioning ([a55a094](https://github.com/entrostat/entro-ci/commit/a55a094eafb9b25999ab3f8dbc92699627628ff7))


### Bug Fixes

* **docs:** Updated the badge styles in the readme ([2a70076](https://github.com/entrostat/entro-ci/commit/2a70076fb017d1dabafb76ed9f916836e193fc9b))

## [2.6.0](https://github.com/entrostat/entro-ci/compare/v2.5.0...v2.6.0) (2021-09-26)


### Features

* **versioning:** Added entro-version to the project ([f4232c3](https://github.com/entrostat/entro-ci/commit/f4232c3e98e8e89d19c06c2d2d02fa1fac79841f))

## [2.5.0](https://github.com/entrostat/entro-ci/compare/v2.4.1...v2.5.0) (2021-09-20)


### Features

* **build-flags:** Added the docker build flags to entro-ci to allow build args and others ([e33240b](https://github.com/entrostat/entro-ci/commit/e33240bfb0ef48ec13e39bc0168e90028a1b619a))

### [2.4.1](https://github.com/entrostat/entro-ci/compare/v2.4.0...v2.4.1) (2021-09-19)

## [2.4.0](https://github.com/entrostat/entro-ci/compare/v2.3.1...v2.4.0) (2021-02-07)


### Features

* **tags:** Append the version to the tag so that we can track versions on tag and not replace the overall version ([ad1b39c](https://github.com/entrostat/entro-ci/commit/ad1b39c521836ec1f87ad2016e8108e43576e3a7))

### [2.3.1](https://github.com/entrostat/entro-ci/compare/v2.3.0...v2.3.1) (2021-02-07)


### Bug Fixes

* **buill-command:** Default the watch directories to an empty array ([424dd3c](https://github.com/entrostat/entro-ci/commit/424dd3c2e359cc48638565b4cc3f84353cd724d2))

## [2.3.0](https://github.com/entrostat/entro-ci/compare/v2.2.0...v2.3.0) (2021-02-07)


### Features

* **watch:** Added the ability to watch directories during the build (ie. we don't trigger on the build directory but on a subset) ([3ee619b](https://github.com/entrostat/entro-ci/commit/3ee619b3b1bc8af0c759209ce713dabc4b8246bd)), closes [#4](https://github.com/entrostat/entro-ci/issues/4)

## [2.2.0](https://github.com/entrostat/entro-ci/compare/v2.1.1...v2.2.0) (2021-02-07)


### Features

* **build-triggers:** Added a post-build trigger that lets you run a script if the image was built ([5d67557](https://github.com/entrostat/entro-ci/commit/5d67557b3401dbefd618e9403d0c5bc2c870dafd)), closes [#3](https://github.com/entrostat/entro-ci/issues/3)

### [2.1.1](https://github.com/entrostat/entro-ci/compare/v2.1.0...v2.1.1) (2021-02-06)


### Bug Fixes

* **build:** Ensure that the package key is passed into the build function from all commands ([e9b4c16](https://github.com/entrostat/entro-ci/commit/e9b4c1665d5a9bff3cf658806a58e1428e9dd122))

## [2.1.0](https://github.com/entrostat/entro-ci/compare/v2.0.2...v2.1.0) (2021-02-06)


### Features

* **templating:** Added template support for any scripts that should update when the version changes ([893101f](https://github.com/entrostat/entro-ci/commit/893101fa372dfe95a297d113f1a0ce60e5a26d1c)), closes [#2](https://github.com/entrostat/entro-ci/issues/2)

### [2.0.2](https://github.com/entrostat/entro-ci/compare/v2.0.1...v2.0.2) (2021-02-06)


### Bug Fixes

* **reflect-metadata:** Added the import for reflect-metadata to ensure that the CLI builds and runs correctly ([3483c95](https://github.com/entrostat/entro-ci/commit/3483c958bf3801901c0fb97f3b2da161a223b6be))

### [2.0.1](https://github.com/entrostat/entro-ci/compare/v2.0.0...v2.0.1) (2021-02-06)


### Bug Fixes

* **logger:** Use the logger instead of passing parameters ([6de012b](https://github.com/entrostat/entro-ci/commit/6de012b0f5f7f47328bdb5191132cbfdb86cb6ce))

## [2.0.0](https://github.com/entrostat/entro-ci/compare/v1.5.7...v2.0.0) (2021-02-06)


### Features

* **docker-build:** Completely changed the build process to only use the docker registry to determine if something has been built and added the ability to track whether or not the build happened now. ([2c2feb9](https://github.com/entrostat/entro-ci/commit/2c2feb95221b451a6330f1ff21cc2cce72108af5)), closes [#1](https://github.com/entrostat/entro-ci/issues/1)

### [1.5.7](https://github.com/entrostat/entro-ci/compare/v1.5.6...v1.5.7) (2021-01-21)


### Bug Fixes

* **build:** Short term fix to trigger the build again ([7bec095](https://github.com/entrostat/entro-ci/commit/7bec095fe0a3d739effe7d0a3294a6f8e5b6f492))

### [1.5.6](https://github.com/entrostat/entro-ci/compare/v1.5.5...v1.5.6) (2021-01-21)

### [1.5.5](https://github.com/entrostat/entro-ci/compare/v1.5.4...v1.5.5) (2021-01-18)


### Bug Fixes

* **build:** Alias key override - short-term fix ([ae3c615](https://github.com/entrostat/entro-ci/commit/ae3c615c1e734cc2e2df68c08fbd1c6614e9a82f))

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
