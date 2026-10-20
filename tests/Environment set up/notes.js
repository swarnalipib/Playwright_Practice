/*

//npm is used to install,update and manage packages
-when you need to set up your project and add depenedencies we use npm\
-Permanently saves files into your node_modules folder.
-Maintains package.json file to track project dependencies.
-Provides scripts for automating tasks (like building and testing).


npm init playwright@latest

npm -v 

(Note: This uses an initializer script to download and scaffold a fresh project structure.)

//npx is used to execute binaries
-is used to execute Node.js packages without installing them globally.
-Automatically downloads and executes packages if not installed locally.
-Allows you to run packages without permanently installing them.
-Useful for one-time execution of packages (e.g., running create-react-app).
-Handles versioning issues by ensuring the latest or specific version of a package is executed.

npx -v

You can execute your package without installation, to do so run the following command.
npx your-package-name

1.Run your test suite
npx playwright test

2.Open the interactive UI Mode:
npx playwright test --ui

3.Record user actions to generate test code (Codegen)
npx playwright codegen

4.View HTML test reports:b
npx playwright show-report


5.


*/