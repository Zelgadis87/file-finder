@zelgadis87/file-finder
=======================

Find files with a certain name, within a given folder tree.  
Similar to the find Unix command, but portable and with different search capabilities.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@zelgadis87/file-finder.svg)](https://npmjs.org/package/@zelgadis87/file-finder)
[![Downloads/week](https://img.shields.io/npm/dw/@zelgadis87/file-finder.svg)](https://npmjs.org/package/@zelgadis87/file-finder)
[![License](https://img.shields.io/npm/l/@zelgadis87/file-finder.svg)](https://github.com/Zelgadis87/file-finder/blob/master/package.json)

# Usage from the CLI

## How to use:

### Use without installation:
> `npx @zelgadis87/file-finder <FILENAME> [FOLDER]`

This will always use the latest version of file-finder.

### Use a globally installed version:

First install `file-finder` with:
> ` npm install -g @zelgadis87/file-finder`

Then, to use, type: 
> `@zelgadis87/fle-finder <FILENAME> [FOLDER]`

This will use the globally installed version. You will need to manually update when a new version is available, using:
> ` npm install -g @zelgadis87/file-finder`

## Arguments
- `FILENAME`: (required) The name of the file to search for (case insensitive). By default, search for files containing the given string (can be overridden by `--exact`).
- `FOLDER`: (default: .) The folder from where the search should be started. By default, the current folder.

## Flags
- `-e`, `--exact`: Use strict filename matching (case insensitive). Only files exactly equal to `FILENAME` (extension included) will be returned.
- `-r`, `--recursive`: (default: false) If true, will also traverse subfolders.
- `-n`, `--maxDepth=maxDepth`: (default: 0) The maximum number of subfolders to traverse. By default stops in the current folder. Use `--recursive` for infinite.
- `--relative`: (default: false) If true, output will display as relative paths to the current folder.

## Examples:
```
> $ npx @zelgadis87/file-finder README
> /current/file/path/README.md
```
```
> $ npx @zelgadis87/file-finder README.md --relative --exact
> README.md
```
```
> $ npx @zelgadis87/file-finder README.md --relative --maxDepth=1
> README.md
> lib/README.md
```
```
> $ npx @zelgadis87/file-finder README node_modules --relative --recursive
> node_modules/a/readme.md
> node_modules/b/README
> node_modules/c/docs/README.md
```

# Programmatic usage:

Inside your Node project, type:
> ` npm install @zelgadis87/file-finder`

When needed, require file-finder and use it's `find` method:
> `let FileFinder = require( '@zelgadis87/file-finder' );`  
> `new FileFinder().find( folder, filename, opts );`

This will result in a `Promise`, which will be eventually resolved with a list of files matching the given inputs.

## Arguments:
  - `folder`: Is the relative or absolute folder where the search should start from
  - `filename`: Is the name of the file you are searching for.
  - `opts`: [optional]
    - `opts.maxDepth`: (default: 0) is the maximum number of nested subfolders traversed. Use -1 for infinite.
    - `opts.exact`: (default: false) whether or not searches for files matching exactly the given name (case insensitive). If false, a contain matching is performed.
    - `opts.relative`: (default: false) if true returns the relative path to the matched files, otherwise the full path is returned.

