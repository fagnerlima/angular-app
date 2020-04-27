import { TestBed, async, inject } from '@angular/core/testing';
import { FormValidationService } from './form-validation.service';

/** @todo implementar testes */
describe('Service: FormValidation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormValidationService]
    });
  });

  it('should ...', inject([FormValidationService], (service: FormValidationService) => {
    expect(service).toBeTruthy();
  }));
});
