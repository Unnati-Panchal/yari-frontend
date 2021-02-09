import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {Type} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';

import {ProfileService} from '@yaari/services/profile/profile.service';

describe('ThirdPartyService', () => {
  let httpTestingController: HttpTestingController;
  let thirdPartyService: ProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController as Type<HttpTestingController>);
    thirdPartyService = TestBed.inject(ProfileService);

  });

  it('should be created', () => {
    expect(thirdPartyService).toBeTruthy();
  });
});
