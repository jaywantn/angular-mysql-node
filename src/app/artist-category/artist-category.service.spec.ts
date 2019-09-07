import { TestBed } from '@angular/core/testing';

import { ArtistCategoryService } from './artist-category.service';

describe('ArtistCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtistCategoryService = TestBed.get(ArtistCategoryService);
    expect(service).toBeTruthy();
  });
});
