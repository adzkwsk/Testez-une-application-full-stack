import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule, } from '@angular/router/testing';
import { expect } from '@jest/globals'; 
import { SessionService } from '../../../../services/session.service';

import { DetailComponent } from './detail.component';
import { SessionApiService } from '../../services/session-api.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { of } from 'rxjs';


describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let sessionApiService: Partial<SessionApiService>;
  let teacherService: Partial<TeacherService>;

  let mockMatSnackBar: jest.Mocked<MatSnackBar>;

  const mockSessionService = {
    sessionInformation: {
      token: 'token',
      type: 'Bearer',
      id: 1,
      username: 'example@test.com',
      firstName: 'Jean',
      lastName: 'Dupont',
      admin: true
    }
  };

  mockMatSnackBar = {
    open: jest.fn()
  } as unknown as jest.Mocked<MatSnackBar>;


  beforeEach(async () => {
    sessionApiService = {
      delete: jest.fn().mockReturnValue(of({})),
      detail: jest.fn().mockReturnValue(of({})),
      participate: jest.fn().mockReturnValue(of({})),
      unParticipate: jest.fn().mockReturnValue(of({}))
    };

    teacherService = {
      detail: jest.fn().mockReturnValue(of({}))
    };

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatSnackBarModule,
        ReactiveFormsModule
      ],
      declarations: [DetailComponent],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        { provide: SessionApiService, useValue: sessionApiService },
        { provide: TeacherService, useValue: teacherService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
  });

  it('is created', () => {
    expect(component).toBeTruthy();
  });

  it('invokes delete on component deletion', () => {
    const sessionApiServiceDeleteSpy = jest.spyOn(sessionApiService, 'delete');

    component.delete();

    expect(sessionApiServiceDeleteSpy).toHaveBeenCalled();
    // add routes navigation
  });

  it('invokes participate on participation', () => {
    const sessionApiServiceParticipateSpy = jest.spyOn(sessionApiService, 'participate');

    // add fetchSession scenario
    component.participate();

    expect(sessionApiServiceParticipateSpy).toHaveBeenCalled();
  });

  it('invokes unParticipate on withdrawal', () => {
    const sessionApiServiceUnParticipateSpy = jest.spyOn(sessionApiService, 'unParticipate');

    component.unParticipate();

    expect(sessionApiServiceUnParticipateSpy).toHaveBeenCalled();
  });
});

