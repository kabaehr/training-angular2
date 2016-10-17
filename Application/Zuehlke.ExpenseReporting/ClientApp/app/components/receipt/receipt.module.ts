import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { productRouting } from './receipt.routing';
import { ReceiptOverviewComponent } from './receipt-overview.component';
import { ReceiptDetailComponent } from './receipt-detail.component';
import { ReceiptAddComponent } from './receipt-add.component';
import { ReceiptFilterPipe } from './receipt-filter.pipe';
import { ReceiptService } from './receipt.service';
import { ReceiptFormComponent } from './receipt-form.component';

@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    productRouting
  ],
  declarations: [
    ReceiptOverviewComponent,
    ReceiptDetailComponent,
    ReceiptFormComponent,
    ReceiptAddComponent,
    ReceiptFilterPipe
  ],
  providers: [
    ReceiptService
  ]
})
export class ReceiptModule {}
