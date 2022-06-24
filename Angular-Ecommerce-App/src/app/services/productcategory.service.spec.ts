import { TestBed } from '@angular/core/testing';

import { ProductcategoryService } from './productcategory.service';

describe('ProductcategoryService', () => {
  let service: ProductcategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductcategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
