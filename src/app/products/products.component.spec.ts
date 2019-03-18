import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ProductsComponent } from './products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatExpansionModule,
  MatButtonModule,
} from '@angular/material';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let debug: DebugElement;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatExpansionModule,
        MatButtonModule,
      ],
      declarations: [ ProductsComponent ]
    })
    .compileComponents()
    .then( () => {
      fixture = TestBed.createComponent(ProductsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      debug = fixture.debugElement.query(By.css('.top-button'));
      element = debug.nativeElement;
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an array of products', async () => {
    await component.ngOnInit();
    expect(component.products$).not.toBe(null);
  });

  it ('should open new form when add new clicked', () => {
    fixture.detectChanges();
    spyOn(component, 'showForm');
    element.click();
    expect(component.showForm).toBeTruthy();
  });

  describe('Product List Tests', () => {
    it ('should expand a product when clicked', () => {
      
    });
  });

  describe('Form Tests', () => {
    beforeEach( () => {
      element.click();
      fixture.detectChanges();
      debug = fixture.debugElement.query(By.css('.form'));
      element = debug.nativeElement;
    });

    it('should not be able to submit if nothing put into form', () => {
      fixture.detectChanges();
      spyOn(component, 'addOrEdit');
      element = fixture.debugElement.query(By.css('#submit')).nativeElement;
      element.click();
      expect(component.addOrEdit).not.toHaveBeenCalled();
    });

    it('should be able to tell invalid sku', () => {
      component.crudForm.controls['sku'].setValue(12);
      expect(component.crudForm.valid).toBeFalsy();
    });

    it('should be able to tell an invalid description', () => {
      component.crudForm.controls['description'].setValue('');
      expect(component.crudForm.valid).toBeFalsy();
    });

    it ('should be able to tell an invalid price', () => {
      component.crudForm.controls['price'].setValue(34.3456);
      expect(component.crudForm.valid).toBeFalsy();
    });

    it ('should be able to tell valid inputs', () => {
      component.crudForm.controls['sku'].setValue(123456);
      component.crudForm.controls['description'].setValue('description');
      component.crudForm.controls['price'].setValue(34.34);
      expect(component.crudForm.valid).toBeTruthy();
    });
  });
});
