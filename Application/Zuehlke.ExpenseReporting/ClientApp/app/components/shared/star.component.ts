import { Component, OnChanges, Input,
         Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ai-star',
    template: require('./star.component.html'),
    styles: [require('./star.component.css')]
})
export class StarComponent implements OnChanges {
    @Input() rating: number;
    starWidth: number;

    ngOnChanges(): void {
        // Convert x out of 5 starts to y out of 86px width
        this.starWidth = this.rating * 86 / 5;
    }

}
