import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { UserService } from './user.service';
import { of } from 'rxjs';
import { User } from '../interfaces/user.interface';

describe('UserService', () => {
  let service: UserService;
  let httpClientMock: jest.Mocked<HttpClient>;

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn(),
      delete: jest.fn(),
    } as any; // Type casting for simplicity

    service = new UserService(httpClientMock);
  });

  const mockUser: User = {
    id: 1,
    email: 'john.doe@example.com',
    lastName: 'Doe',
    firstName: 'John',
    admin: false,
    password: 'secret', // Not used in real testing scenarios
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('should get a user by ID', (done) => {
    const userId = '1';
    httpClientMock.get.mockReturnValue(of(mockUser));

    service.getById(userId).subscribe(user => {
      expect(user).toEqual(mockUser);
      expect(httpClientMock.get).toHaveBeenCalledWith(`${service['pathService']}/${userId}`);
      done();
    });
  });

  it('should delete a user by ID', (done) => {
    const userId = '1';
    httpClientMock.delete.mockReturnValue(of(null)); // Assuming delete returns nothing significant (did not checked the backend for this)

    service.delete(userId).subscribe(response => {
      expect(response).toBeNull();
      expect(httpClientMock.delete).toHaveBeenCalledWith(`${service['pathService']}/${userId}`);
      done();
    });
  });
});

