## Example Application ##
This is a simple example application demonstration how ASP.NET Core, Angular 2, TypeScript and WebPack (to name just these four) work together.

### Before the first launch ###
Before launching the application for the first time after cloning the repository make sure to rebuild the vendor scripts.

If you have not installed WebPack yet make sure to install it by opening a command prompt and running

	npm install -g webpack

After you have done this run

	webpack --config webpack.config.vendor.js

in a command prompt located at the Zuehlke.ExpenseReporting folder.

You need to repeat this step if you want to add another third party library to the project. See [bit.ly/aspnetcoretp](http://bit.ly/aspnetcoretp) for details.