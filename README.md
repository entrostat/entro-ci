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
$ eci COMMAND
running command...
$ eci (-v|--version|version)
entro-ci/0.0.0 linux-x64 node-v12.18.3
$ eci --help [COMMAND]
USAGE
  $ eci COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`eci docker:build [FILE]`](#eci-dockerbuild-file)
* [`eci hash:directory [DIRECTORY]`](#eci-hashdirectory-directory)
* [`eci help [COMMAND]`](#eci-help-command)

## `eci docker:build [FILE]`

describe the command here

```
USAGE
  $ eci docker:build [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/docker/build.ts](https://github.com/entrostat/entro-ci/blob/v0.0.0/src/commands/docker/build.ts)_

## `eci hash:directory [DIRECTORY]`

Generates the hash of a directory and outputs it to screen.

```
USAGE
  $ eci hash:directory [DIRECTORY]
```

_See code: [src/commands/hash/directory.ts](https://github.com/entrostat/entro-ci/blob/v0.0.0/src/commands/hash/directory.ts)_

## `eci help [COMMAND]`

display help for eci

```
USAGE
  $ eci help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_
<!-- commandsstop -->
