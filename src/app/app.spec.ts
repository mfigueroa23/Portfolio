import { TestBed } from '@angular/core/testing';
import { FetchBackend, HttpBackend, HttpClient } from '@angular/common/http';
import { App } from './app';
import { appConfig } from './app.config';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });
  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

describe('appConfig', () => {
  it('provides HttpClient backed by fetch', () => {
    TestBed.configureTestingModule({ providers: appConfig.providers });
    expect(TestBed.inject(HttpClient)).toBeTruthy();
    expect(TestBed.inject(HttpBackend)).toBeInstanceOf(FetchBackend);
  });
});
