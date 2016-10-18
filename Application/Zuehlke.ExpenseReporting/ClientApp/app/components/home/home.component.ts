import { Component } from '@angular/core';

@Component({
    selector: 'home',
    template: require('./home.component.html')
})
export class HomeComponent {
    public zuehlkeLogo: string = require('../../assets/images/zuehlke_logo.jpg');
}
