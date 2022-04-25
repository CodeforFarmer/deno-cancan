# Deno Scripting Template

A template repo for developing scripts with deno. These scripts can be compiled
to single js files or even bundled with the deno executable for distribution.

This could also be used as a base for a cli written in deno, simply use a
cli-args parsing package in `main.ts` and build out the commands.

## Folder Structure

- `.vscode` = A folder, 
  - containing a `settings.json` which activates the deno language server for this workspace
  - containing a `extensions.json` with recommended vscode extensions for this workspace
- `example` = A folder, containing entry deno files for demonstrating the modules functionalities 
   - contains `main.ts` - the default file for examples
- `dependencies` = A folder, including dependency re-exports
- `lib` = A folder containing more source files which are exported by `mod.ts`
   - Hint: you may create multiple of them to structure your module.
- `.gitignore` = A normal gitingore file
- `deno.json` - a config file for the deno cli
   - includes tasks (a.k.a aliases for long commands) with `deno task`
- `LICENSE`
- `mod.ts` = the entrypoint for this deno module, which exports all functionality of this module
- `Readme.md` = A normal Readme file

## Running examples 

see `tasks` property in `deno.json`
Run each key there with `deno task <task-key>`

## Customize this repo 

- replace `lib/startKia.ts` with a file which makes more sense for your deno module

## Configure Deployments to deno.land/x 

see https://deno.land/add_module