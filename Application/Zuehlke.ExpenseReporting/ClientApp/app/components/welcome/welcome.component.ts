import { Component } from '@angular/core';

@Component({
    template: require('./welcome.component.html')
})
export class WelcomeComponent {
    public pageTitle: string = 'Welcome';
    public zuehlkeLogo: string = require('../../assets/images/zuehlke_logo.jpg');
}
