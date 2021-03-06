## Angular 2 Training ##

This repository contains materials and source code for the workshop introducing Angular 2 together with TypeScript and ASP.NET Core.

### Before the first launch ###
Before launching the application for the first time after cloning the repository make sure to rebuild the vendor scripts and install the typings.

If you have not installed WebPack yet make sure to install it by opening a command prompt and running

	npm install -g webpack
	
If you have not installed typings yet make sure to install it by opening a command prompt and running

	npm install -g typings

After you have done this run

	webpack --config webpack.config.vendor.js

in a command prompt located at the Zuehlke.ExpenseReporting folder.

You need to repeat this step if you want to add another third party library to the project. See [bit.ly/aspnetcoretp](http://bit.ly/aspnetcoretp) for details.