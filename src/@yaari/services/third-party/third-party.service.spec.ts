import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {Type} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';

import {ThirdPartyService} from '@yaari/services/third-party/third-party.service';

describe('ThirdPartyService', () => {
  let httpTestingController: HttpTestingController;
  let thirdPartyService: ThirdPartyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController as Type<HttpTestingController>);
    thirdPartyService = TestBed.inject(ThirdPartyService);

  });

  it('should be created', () => {
    expect(thirdPartyService).toBeTruthy();
  });
});
