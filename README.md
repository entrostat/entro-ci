entro-ci
========

An automated CI tool to help with building packages and ignoring them when there wasn&#39;t a change.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/entro-ci.svg)](https://npmjs.org/package/entro-ci)
[![Downloads/week](https://img.shields.io/npm/dw/entro-ci.svg)](https://npmjs.org/package/entro-ci)
[![License](https://img.shields.io/npm/l/entro-ci.svg)](https://github.com/entrostat/entro-ci/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g entro-ci
$ entro-ci COMMAND
running command...
$ entro-ci (-v|--version|version)
entro-ci/1.3.1 linux-x64 node-v12.16.3
$ entro-ci --help [COMMAND]
USAGE
  $ entro-ci COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`entro-ci docker:build`](#entro-ci-dockerbuild)
* [`entro-ci docker:build-from-file`](#entro-ci-dockerbuild-from-file)
* [`entro-ci hash:directory [DIRECTORY]`](#entro-ci-hashdirectory-directory)
* [`entro-ci help [COMMAND]`](#entro-ci-help-command)
* [`entro-ci kube:deployment:update DEPLOYMENT [NAMESPACE]`](#entro-ci-kubedeploymentupdate-deployment-namespace)

## `entro-ci docker:build`

Checks if the Docker image has been built before and if it has not then it will build it and push it with the hash to the Docker registry

```
USAGE
  $ entro-ci docker:build

OPTIONS
  -R, --dry-run                            Whether to run this live or do a dry run
  -d, --directory=directory                (required) The path to the directory that you want to build
  -f, --docker-file-name=docker-file-name  [default: Dockerfile] The name of the Docker file in the directory

  -i, --image-name=image-name              (required) The name of the Docker image name without the version on it, eg:
                                           entrostat/entro-ci is correct and entrostat/entro-ci:latest is not valid

  -r, --registry=registry                  The registry that should be used (by default Docker Hub is used)

  -t, --tag=tag                            The tag version that should be pushed to the registry so that it can be used
                                           in automated deployments

EXAMPLES
  entro-ci docker:build --directory=./backend --image-name=my-repo/my-image --tag=stable
```

_See code: [src/commands/docker/build.ts](https://github.com/entrostat/entro-ci/blob/v1.3.1/src/commands/docker/build.ts)_

## `entro-ci docker:build-from-file`

Checks to see if a specific Dockerfile has changed (not the contents of a directory) and builds if this is the case

```
USAGE
  $ entro-ci docker:build-from-file

OPTIONS
  -R, --dry-run                            Whether to run this live or do a dry run
  -f, --docker-file-path=docker-file-path  (required) The path to the Docker file

  -i, --image-name=image-name              (required) The name of the Docker image name without the version on it, eg:
                                           entrostat/entro-ci is correct and entrostat/entro-ci:latest is not valid

  -r, --registry=registry                  The registry that should be used (by default Docker Hub is used)

  -t, --tag=tag                            The tag version that should be pushed to the registry so that it can be used
                                           in automated deployments

  -w, --watch-file=watch-file              One or more files that should be "watched" for change that fall into this
                                           Dockerfile. So it is not a whole folder but a file or two.

EXAMPLES
  entro-ci docker:build-from-file --image-name=my-repo/my-image --docker-file-path=./backend/Dockerfile 
  --watch-file=./backend/package.json --watch-file=./backend/manifest.json --tag=stable
```

_See code: [src/commands/docker/build-from-file.ts](https://github.com/entrostat/entro-ci/blob/v1.3.1/src/commands/docker/build-from-file.ts)_

## `entro-ci hash:directory [DIRECTORY]`

Generates the hash of a directory and outputs it to screen.

```
USAGE
  $ entro-ci hash:directory [DIRECTORY]
```

_See code: [src/commands/hash/directory.ts](https://github.com/entrostat/entro-ci/blob/v1.3.1/src/commands/hash/directory.ts)_

## `entro-ci help [COMMAND]`

display help for entro-ci

```
USAGE
  $ entro-ci help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_

## `entro-ci kube:deployment:update DEPLOYMENT [NAMESPACE]`

Trigger an update on a deployment

```
USAGE
  $ entro-ci kube:deployment:update DEPLOYMENT [NAMESPACE]

ARGUMENTS
  DEPLOYMENT  The name of the deployment that you would like to update
  NAMESPACE   [default: default] The namespace that the deployment is in

OPTIONS
  -b, --bin=bin  [default: kubectl] The path to the kubectl executable

ALIASES
  $ entro-ci kdu
```

_See code: [src/commands/kube/deployment/update.ts](https://github.com/entrostat/entro-ci/blob/v1.3.1/src/commands/kube/deployment/update.ts)_
<!-- commandsstop -->
