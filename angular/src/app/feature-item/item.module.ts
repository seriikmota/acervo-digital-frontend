import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemRoutingModule } from './item-routing.module';
import {ListItemsComponent} from "./list-items/list-items.component";
import {EditItemsComponent} from "./edit-items/edit-items.component";
import {SharedMaterialModule} from "../architecture/shared-material/shared-material.module";


@NgModule({
  declarations: [
    ListItemsComponent,
    EditItemsComponent,
  ],
  imports: [
    CommonModule,
    ItemRoutingModule,
    SharedMaterialModule,
  ]
})
export class ItemModule { }
