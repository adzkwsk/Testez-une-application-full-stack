import { HttpClient, HttpClientModule } from '@angular/common/http';
import { expect } from '@jest/globals';

import { TeacherService } from './teacher.service';
import { Teacher } from '../interfaces/teacher.interface';
import { of } from 'rxjs';

describe('TeacherService', () => {
  let service: TeacherService;
  let httpClientMock: jest.Mocked<HttpClient>;

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn(),
    } as any; // Type casting to avoid implementing every method of HttpClient

    service = new TeacherService(httpClientMock);
  });

  const mockTeacher: Teacher = {
    id: 1,
    lastName: 'Doe',
    firstName: 'John',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('should request all teachers', (done) => {
    httpClientMock.get.mockReturnValue(of([mockTeacher]));

    service.all().subscribe(teachers => {
      expect(teachers).toEqual([mockTeacher]);
      expect(httpClientMock.get).toHaveBeenCalledWith('api/teacher');
      done();
    });
  });

  it('should request details of a teacher', (done) => {
    httpClientMock.get.mockReturnValue(of(mockTeacher));

    service.detail('1').subscribe(teacher => {
      expect(teacher).toEqual(mockTeacher);
      expect(httpClientMock.get).toHaveBeenCalledWith(`api/teacher/1`);
      done();
    });
  });
});
