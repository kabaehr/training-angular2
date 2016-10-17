import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { AppComponent } from './components/app/app.component'
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ExpenseModule } from './components/expense/expense.module';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        WelcomeComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        ExpenseModule, 
        RouterModule.forRoot([
            { path: '', redirectTo: 'welcome', pathMatch: 'full' },
            { path: 'welcome', component: WelcomeComponent },
            { path: '**', redirectTo: 'welcome' }
        ])
    ]
})
export class AppModule {
}
