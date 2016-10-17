import {  PipeTransform, Pipe } from '@angular/core';
import { Receipt } from './receipt';

@Pipe({
    name: 'receiptFilter'
})
export class ReceiptFilterPipe implements PipeTransform {

    transform(value: Receipt[], filter: string): Receipt[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((receipt: Receipt) =>
            receipt.name.toLocaleLowerCase().indexOf(filter) !== -1) : value;
    }
}
