import { NgModule } from '@angular/core';
import {
  MatTabsModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatExpansionModule,
  MatButtonModule,
  MatDialogModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatTabsModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [
    MatTabsModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatButtonModule,
    MatDialogModule,
  ]
})

export class MaterialModule { };