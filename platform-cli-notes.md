# Platform & CLI notes

## CLI Commands

- Just using ```ng new``` will make the angular cli prompt you for the project name
- the ```--prefix``` option can be used to override the project prefix and create all component with that prefix
- the ```--routing``` option generates project with a routing module
- the ```--skip-tests``` option skips creating spec files for the project
- ```ng help``` can give you a list of all available commands
- adding ```--help``` to any command gives the list of options, arguments & schematics available to that command
- you can also use the alias of a command, like g for generate
- not all options are returned just for generate so you can specify --help on ```generate component``` or ```g c``` to get all the options for generating a component

The angular docs covers details about these commands on the website as well

---

## Config files

- the ```editor config``` is used by the IDE to set up some editing rules
- the ```gitignore``` file specifies what all things should be ignored by git
- ```prettierignore``` decides what all files are ignored by the prettier formatting
- ```prettierrc``` file specifies all the prettier formatting rules
- ```angular json``` covered in a separate section
- ```browserlist``` file specifies which browsers are to be supported by angular when app is built for production. The cli looks at this and prefixes styles and loads polyfills accordingly.
- ```karma config``` file is used to setup the configuration for karma used for unit testing
- ```package-lock``` json and ```package``` json specifies all the dependencies & npm scripts to the project
- the ```tsconfig``` files for app (browser), spec (test), worker (web workers) and server (server) allows tuning the typescript compilation for the project depending on where its running and inherits from the main tsconfig json file. It also includes angularCompilerOptions which specify angular specific compilation and not just typescript.
- the ```tslint``` file also specifies code editing rules on the IDE

---

## CLI Schematics

- schematics are a workflow tool that changes your project somehow to do something. It can fix breaking changes or create components and so on. ```ng add``` and ```ng update``` are examples.
- you can build your own custom schematics
- ```ng add``` for example can install packages, prompt for configurations, update files to add support for the packages added etc for your project with just one command
- to override schematics from default, we can specify which custom schematic to use, add a colon, then the name of the supported schematic, and then specify options. An exmaple is like ```ng g @ngrx/schematics:c```
- ```ng-update``` can be used to update angular projects with new versions
- ```ng-deploy``` can be used to automatically deploy apps from the cli to a host that supports it

---

## Differential Loading

- modern browsers need fewer polyfills and therefore we can get away with sending a smaller bundle to them whereas legacy browsers require more polyfills to enable certain features making the bundle size bigger. We can either send optimized bundles and ignore legacy browsers or we can send bigger bundles to support everything at the cost of bundle size
- differential loading does both by running a small script on browser to detect the browser and then send either the optimized or the bigger bundle accordingly
- browserlist specifies the browsers supported to that angular cli can know what all bundles to generate
- tsconfig target specifies the js version supported where es2015 is modern. Angular still generates the es5 bundles for legacy browsers though when using differential loading.
- polyfills have to be uncommented/added and installed by npm for certain features to be used in old browsers

---

## Managing multiple projects in one folder

- In one folder, we can add a new project with ```ng generate library``` or ```ng generate application```
- We can also do a ```create-application=false``` to not create any components etc but only the required config files and then create a new library or application, all of which will go into the projects folder
- angular material is not a web app but its a library and that's why even libraries have components now

---

## Angular JSON

- This is the most important config file
- This is used by the cli to run different commands etc and specify default flags
- It includes the settings for each project and each project specifies options for generating build files for different environments, serve files during serve, test files during test etc

---
