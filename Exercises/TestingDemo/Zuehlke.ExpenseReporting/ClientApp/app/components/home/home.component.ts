import { Component } from '@angular/core';

@Component({
    selector: 'home',
    template: require('./home.component.html')
})
export class HomeComponent {

    zuehlkeLogo: string = require('../../assets/images/zuehlke_logo.jpg');
    pageTitle: string = 'Welcome to the Expenses Management Tool';

}
