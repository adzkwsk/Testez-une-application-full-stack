import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { SessionApiService } from './session-api.service';
import { Session } from '../interfaces/session.interface';
import { of } from 'rxjs';


describe('SessionApiService', () => {
  let service: SessionApiService;
  let httpClientMock: jest.Mocked<HttpClient>;

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    } as any;

    service = new SessionApiService(httpClientMock);
  });

  const mockSession: Session = {
    id: 1,
    name: 'Test Session',
    description: 'This is a test session',
    date: new Date(),
    teacher_id: 100,
    users: [200, 201],
  };

  it('should request all sessions', (done) => {
    httpClientMock.get.mockReturnValue(of([mockSession]));

    service.all().subscribe(sessions => {
      expect(sessions).toEqual([mockSession]);
      expect(httpClientMock.get).toHaveBeenCalledWith('api/session');
      done();
    });
  });

  it('should request details of a session', (done) => {
    httpClientMock.get.mockReturnValue(of(mockSession));

    service.detail('1').subscribe(session => {
      expect(session).toEqual(mockSession);
      expect(httpClientMock.get).toHaveBeenCalledWith(`api/session/1`);
      done();
    });
  });

  it('should delete a session', (done) => {
    httpClientMock.delete.mockReturnValue(of({}));

    service.delete('1').subscribe(response => {
      expect(response).toEqual({});
      expect(httpClientMock.delete).toHaveBeenCalledWith(`api/session/1`);
      done();
    });
  });

  it('should create a session', (done) => {
    httpClientMock.post.mockReturnValue(of(mockSession));

    service.create(mockSession).subscribe(session => {
      expect(session).toEqual(mockSession);
      expect(httpClientMock.post).toHaveBeenCalledWith('api/session', mockSession);
      done();
    });
  });

  it('should update a session', (done) => {
    const updatedSession: Session = { ...mockSession, name: 'Updated Test Session' };
    httpClientMock.put.mockReturnValue(of(updatedSession));

    service.update('1', updatedSession).subscribe(session => {
      expect(session).toEqual(updatedSession);
      expect(httpClientMock.put).toHaveBeenCalledWith(`api/session/1`, updatedSession);
      done();
    });
  });

  it('should register a user as a participant of a session', (done) => {
    httpClientMock.post.mockReturnValue(of({}));

    service.participate('1', '300').subscribe(response => {
      expect(response).toEqual({});
      expect(httpClientMock.post).toHaveBeenCalledWith(`api/session/1/participate/300`, null);
      done();
    });
  });

  it('should unregister a user as a participant of a session', (done) => {
    httpClientMock.delete.mockReturnValue(of({}));

    service.unParticipate('1', '300').subscribe(response => {
    expect(response).toEqual({});
    expect(httpClientMock.delete).toHaveBeenCalledWith(`api/session/1/participate/300`);
      done();
    });
  });
});
