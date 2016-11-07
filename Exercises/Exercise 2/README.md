## Exercise 2 ##

This exercise is about deploying our web app to Azure in order to have it available under a public URL.


### Tasks ###

1. Create a new Web App using the Azure portal.
2. Use Visual Studio to deploy the application to Azure.

### Implementation Hints ###

1. Open the Azure Portal (https://portal.azure.com) and sign in using the Microsoft ID assigned to your MSDN-subscription.
2. Open the "App Services" section, click "Add", then select "Web App" and click "Create".
3. Fill in the form:
	* Provide a unique app name. Make sure to use only alphanumeric characters and dashes, as this name will be used as the URL of your application.
	* Select a Subscription. Most likely your MSDN subscription will be preselected.
	* Create a new Resource Group. Again, use only alphanumeric characters and dashes for the name.
	* Create a new App-Service plan. Yet again, use only alphanumeric characters and dashes for the name. Also make sure to select the "Free" pricing tier. You might need to click "view all" to be able to select the "Free" tier.
4. Click create to get your app up and running. Once the webapp is running open [http://{your-appname-goes-here}.azurewebsites.net]()
5. Open the Visual Studio solution contained in the "Before" folder of this excercise.
6. Right-click the Angular2Application1 project and select publish.
7. Choose Microsoft Azure App Service. Then find and select the web app we created in the previous steps.
8. Click "OK" and "Publish". Your website will be opened shortly.