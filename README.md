entro-ci
========

An automated CI tool to help with building packages and ignoring them when there wasn&#39;t a change.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg?style=for-the-badge)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/entro-ci.svg?style=for-the-badge)](https://npmjs.org/package/entro-ci)
[![Downloads/week](https://img.shields.io/npm/dw/entro-ci.svg?style=for-the-badge)](https://npmjs.org/package/entro-ci)
[![License](https://img.shields.io/npm/l/entro-ci.svg?style=for-the-badge)](https://github.com/entrostat/entro-ci/blob/master/package.json)

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
entro-ci/4.3.1 linux-x64 node-v16.19.0
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
* [`entro-ci hash:directory DIRECTORY`](#entro-ci-hashdirectory-directory)
* [`entro-ci help [COMMAND]`](#entro-ci-help-command)
* [`entro-ci kube:deployment:update DEPLOYMENT [NAMESPACE]`](#entro-ci-kubedeploymentupdate-deployment-namespace)
* [`entro-ci project:version`](#entro-ci-projectversion)
* [`entro-ci templates:update`](#entro-ci-templatesupdate)
* [`entro-ci trigger:post-build`](#entro-ci-triggerpost-build)

## `entro-ci docker:build`

Checks if the Docker image has been built before and if it has not then it will build it and push it with the hash to the Docker registry

```
USAGE
  $ entro-ci docker:build

OPTIONS
  -P, --docker-password=docker-password        The password for logging into the docker repository (mainly for if you
                                               are running this build process inside a container)

  -R, --dry-run                                Whether to run this live or do a dry run

  -b, --docker-build-flags=docker-build-flags  Any additional build flags that you would like to plug directly into the
                                               Docker build command

  -d, --directory=directory                    (required) The path to the directory that you want to build

  -f, --docker-file-name=docker-file-name      [default: Dockerfile] The name of the Docker file in the directory

  -i, --image-name=image-name                  (required) The name of the Docker image name without the version on it,
                                               eg: entrostat/entro-ci is correct and entrostat/entro-ci:latest is not
                                               valid

  -l, --latest                                 Whether to push the latest tag to the registry

  -p, --package=package                        [default: ./package.json] The path to the package.json that holds the
                                               version of the build

  -r, --registry=registry                      The registry that should be used (by default Docker Hub is used)

  -t, --tag=tag                                The tag version that should be pushed to the registry so that it can be
                                               used in automated deployments

  -u, --docker-username=docker-username        The username for logging into the docker repository (mainly for if you
                                               are running this build process inside a container)

  -w, --watch-directory=watch-directory        Directories that should be watched to trigger the build. Note, if you set
                                               this then it IGNORES the build directory so you'd have to add that here
                                               as well.

EXAMPLES
  entro-ci docker:build --directory=./backend --image-name=my-repo/my-image --tag=stable
  entro-ci docker:build --directory=./backend --image-name=my-repo/my-image --tag=stable --watch-directory=./backend/src
  entro-ci docker:build --directory=./backend --image-name=my-repo/my-image --tag=stable --watch-directory=./backend/src
   --watch-directory=./backend/migrations
  entro-ci docker:build --directory=./backend --image-name=my-repo/my-image --tag=stable --latest 
  --watch-directory=./project/shared --watch-directory=./backend
  entro-ci docker:build --directory=./backend --image-name=my-repo/my-image --tag=stable 
  --watch-directory=./project/shared --watch-directory=./backend --docker-build-flags="--build-arg API_VERSION=v2 
  --build-arg ENV=prod"
  entro-ci docker:build --directory=./backend --image-name=my-repo/my-image --tag=stable 
  --watch-directory=./project/shared --watch-directory=./backend --docker-build-flags="--build-arg API_VERSION=v2" 
  --docker-build-flags="--build-arg ENV=prod"
```

_See code: [src/commands/docker/build.ts](https://github.com/entrostat/entro-ci/blob/v4.3.1/src/commands/docker/build.ts)_

## `entro-ci docker:build-from-file`

Checks to see if a specific Dockerfile has changed (not the contents of a directory) and builds if this is the case

```
USAGE
  $ entro-ci docker:build-from-file

OPTIONS
  -P, --docker-password=docker-password        The password for logging into the docker repository (mainly for if you
                                               are running this build process inside a container)

  -R, --dry-run                                Whether to run this live or do a dry run

  -b, --docker-build-flags=docker-build-flags  Any additional build flags that you would like to plug directly into the
                                               Docker build command

  -f, --docker-file-path=docker-file-path      (required) The path to the Docker file

  -i, --image-name=image-name                  (required) The name of the Docker image name without the version on it,
                                               eg: entrostat/entro-ci is correct and entrostat/entro-ci:latest is not
                                               valid

  -l, --latest                                 Whether to push the latest tag to the registry

  -p, --package=package                        [default: ./package.json] The path to the package.json that holds the
                                               version of the build

  -r, --registry=registry                      The registry that should be used (by default Docker Hub is used)

  -t, --tag=tag                                The tag version that should be pushed to the registry so that it can be
                                               used in automated deployments

  -u, --docker-username=docker-username        The username for logging into the docker repository (mainly for if you
                                               are running this build process inside a container)

  -w, --watch-file=watch-file                  One or more files that should be "watched" for change that fall into this
                                               Dockerfile. So it is not a whole folder but a file or two.

EXAMPLES
  entro-ci docker:build-from-file --image-name=my-repo/my-image --docker-file-path=./backend/Dockerfile 
  --watch-file=./backend/package.json --watch-file=./backend/manifest.json --tag=stable
  entro-ci docker:build-from-file --image-name=my-repo/my-image --docker-file-path=./backend/Dockerfile 
  --watch-file=./backend/package.json --watch-file=./backend/manifest.json --tag=stable --latest 
  --docker-build-flags="--build-arg API_VERSION=v2"
```

_See code: [src/commands/docker/build-from-file.ts](https://github.com/entrostat/entro-ci/blob/v4.3.1/src/commands/docker/build-from-file.ts)_

## `entro-ci hash:directory DIRECTORY`

Generates the hash of a directory and outputs it to screen.

```
USAGE
  $ entro-ci hash:directory DIRECTORY

ARGUMENTS
  DIRECTORY  The directory that we're hashing
```

_See code: [src/commands/hash/directory.ts](https://github.com/entrostat/entro-ci/blob/v4.3.1/src/commands/hash/directory.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.3.1/src/commands/help.ts)_

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

_See code: [src/commands/kube/deployment/update.ts](https://github.com/entrostat/entro-ci/blob/v4.3.1/src/commands/kube/deployment/update.ts)_

## `entro-ci project:version`

Returns the current version of the project. This command starts from the current directory and moves up until it finds a package.json file.

```
USAGE
  $ entro-ci project:version

OPTIONS
  -p, --package=package  [default: ./package.json] The path of the package.json file that holds the current version

EXAMPLE
  entro-ci project:version
```

_See code: [src/commands/project/version.ts](https://github.com/entrostat/entro-ci/blob/v4.3.1/src/commands/project/version.ts)_

## `entro-ci templates:update`

Updates files specified in the entro-ci.yaml file in the repository

```
USAGE
  $ entro-ci templates:update

OPTIONS
  -V, --outputVersion=outputVersion  The version that you want to set (if you don't want to use the version in the
                                     package.json)

  -f, --file=file                    [default: ./entro-ci.yaml] The path to the yaml file with the config

  -p, --package=package              [default: ./package.json] The path of the package.json file that holds the current
                                     version

EXAMPLES
  entro-ci templates:update
  entro-ci templates:update -f .templates.yaml
```

_See code: [src/commands/templates/update.ts](https://github.com/entrostat/entro-ci/blob/v4.3.1/src/commands/templates/update.ts)_

## `entro-ci trigger:post-build`

Trigger a script if the build with a certain image name triggered during this run

```
USAGE
  $ entro-ci trigger:post-build

OPTIONS
  -S, --shell=shell            [default: /bin/bash] The shell that should be used to trigger this script.
  -a, --all-true               Require all of the image names to have been built to trigger this.

  -i, --image-name=image-name  (required) The image name or image names that should build in order for this to trigger.
                               By default, the trigger works if any one of these names built.

  -s, --script=script          (required) The path to the script you want to run.

EXAMPLES
  entro-ci trigger:post-build --script=./scripts/deploy_prod.sh --image-name=myproject/backend
  entro-ci trigger:post-build --script=./deploy_prod.sh --image-name=myproject/frontend --shell=/bin/zsh
  entro-ci trigger:post-build --script=./deploy_prod.sh --image-name=myproject/backend-os --image-name=myproject/backend
  entro-ci trigger:post-build --script=./deploy_prod.sh --image-name=myproject/backend-os --image-name=myproject/backend
   --all-true
```

_See code: [src/commands/trigger/post-build.ts](https://github.com/entrostat/entro-ci/blob/v4.3.1/src/commands/trigger/post-build.ts)_
<!-- commandsstop -->
