import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.scss'
})
export class ViewPostComponent {

  constructor(  private dialogRef: MatDialogRef<ViewPostComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,) {
  }
}
