import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { SessionService } from './session.service';
import { SessionInformation } from '../interfaces/sessionInformation.interface';

describe('SessionService', () => {
  let service: SessionService;
  const sessionInformation = {
    token: 'abc123',
    type: 'Bearer',
    id: 1,
    username: 'john.doe',
    firstName: 'John',
    lastName: 'Doe',
    admin: true
  } as SessionInformation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
  });

  it('Created', () => {
    expect(service).toBeTruthy();
  });

  it('starts with isLogged as false', () => {
    expect(service.isLogged).toBe(false);
  });

  it('starts without sessionInformation', () => {
    expect(service.sessionInformation).toBeUndefined();
  });

  it('emits isLogged values when subscribed to $isLogged', (done) => {
    const expectedValues = [false, true, false];
    service.$isLogged().subscribe(isLogged => {
      expect(isLogged).toBe(expectedValues.shift());
      if (!expectedValues.length) done();
    });

    service.logIn({} as SessionInformation);
    service.logOut();
  });

  it('logs in correctly', () => {
    service.logIn(sessionInformation);
    expect(service.isLogged).toBe(true);
    expect(service.sessionInformation).toBe(sessionInformation);
  });

  it('logs out correctly', () => {
    service.logIn(sessionInformation);
    service.logOut();

    expect(service.sessionInformation).toBeUndefined();
    expect(service.isLogged).toBe(false);
  });
});
