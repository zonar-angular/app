import { NgModule } from '@angular/core';
import {
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatExpansionModule,
  MatButtonModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatButtonModule,
  ],
  exports: [
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatButtonModule,
  ]
})

export class MaterialModule { };