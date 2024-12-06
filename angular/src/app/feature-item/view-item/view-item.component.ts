import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ItemService} from "../item.service";

@Component({
  selector: 'app-view-item',
  standalone: false,
  templateUrl: './view-item.component.html',
  styleUrl: './view-item.component.scss'
})
export class ViewItemComponent implements OnInit{
  constructor(  private dialogRef: MatDialogRef<ViewItemComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any, private itemsService: ItemService,) {
  }

  ngOnInit(): void {
    if (this.data?.id != null) {
      this.itemsService.consultarView(this.data.id).subscribe(response => {
        if (response) {
          this.data = response;
          console.log(this.data)
        }
      });
    }
    }




}
