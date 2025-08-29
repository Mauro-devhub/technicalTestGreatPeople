import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, input, OnDestroy, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { TextAreaComponent } from '../text-area/text-area.component';
import { ProductModel } from '../../../models/product.model';
import { CategoryModel } from '../../../models/category.model';

@Component({
  selector: 'form-product-component',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    TextAreaComponent
  ],
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.scss'
})
export class FormProductComponent implements OnInit, OnDestroy {
  productForm!: FormGroup;
  formBuilder = inject(FormBuilder);

  isLoading = input<boolean>(false);
  product = input<ProductModel>();
  categories = input<CategoryModel[]>();

  errorProductNameField = signal('');
  errorPriceField = signal('');
  errorCategoryField = signal('');
  errorStockField = signal('');

  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  ngOnInit(): void {
    this.setForm(this.product());
  }

  setForm(product?: ProductModel): void {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      price: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      description: ['']
    });

    if (product) {
      this.productForm.patchValue(product);

      this.productForm.controls['categoryId'].setValue(product.category.id);
    }
  }

  validationForms(): void {
    if (this.productForm.controls['name'].hasError('required') || this.productForm.controls['name'].hasError('minlength') && this.productForm.controls['name'].dirty) {
      this.errorProductNameField.set('El campo nombre de producto es requerio y debe tener minimo 5 caracteres');
    } else {
      this.errorProductNameField.set('');
    }

    if (this.productForm.controls['price'].touched && this.productForm.controls['price'].invalid) {
      this.errorPriceField.set('El campo price es requerido');
    } else {
      this.errorPriceField.set('');
    }

    if (this.productForm.controls['categoryId'].touched && this.productForm.controls['categoryId'].invalid) {
      this.errorCategoryField.set('El campo categoria es requerido');
    } else {
      this.errorCategoryField.set('');
    }

    if (this.productForm.controls['stock'].touched && this.productForm.controls['stock'].invalid) {
      this.errorStockField.set('El campo stock es requerido');
    } else {
      this.errorStockField.set('');
    }
  }

  cancelCreationProduct(): void {
    this.cancel.emit();
  }

  saveData(): void {
    this.productForm.markAllAsTouched();
    this.validationForms();

    if (!this.errorProductNameField() && !this.errorPriceField() && !this.errorCategoryField() && !this.errorStockField()) {
      this.save.emit(this.productForm.value);
    }
  }

  ngOnDestroy(): void {
    this.productForm.reset();
  }
}
