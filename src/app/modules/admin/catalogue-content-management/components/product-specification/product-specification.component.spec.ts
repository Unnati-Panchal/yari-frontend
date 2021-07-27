import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { ProductSpecificationComponent } from './product-specification.component';

describe('ProductSpecificationComponent', () => {
  let component: ProductSpecificationComponent;
  let fixture: ComponentFixture<ProductSpecificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductSpecificationComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: FormBuilder }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSpecificationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
