import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineGraphComponent } from './line-graph/line-graph.component';
import { WindowChangesService } from '../window-changes.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LineGraphComponent],
  exports: [LineGraphComponent],
  providers: [WindowChangesService]
})

export class GraphsModule { }
