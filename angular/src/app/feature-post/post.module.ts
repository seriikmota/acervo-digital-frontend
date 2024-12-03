import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedMaterialModule} from "../architecture/shared-material/shared-material.module";
import {PostRoutingModule} from "./post-routing.module";
import {ListPostComponent} from "./list-post/list-post.component";
import {EditPostComponent} from "./edit-post/edit-post.component";
import {AddPostModalComponent} from "./add-post-modal/add-post-modal.component";
import {TablePostComponent} from "./table-post/table-post.component";
import {ViewPostComponent} from "./view-post/view-post.component";



@NgModule({
  declarations: [
    ListPostComponent,
    EditPostComponent,
    AddPostModalComponent,
    TablePostComponent,
    ViewPostComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    PostRoutingModule
  ]
})
export class PostModule { }
