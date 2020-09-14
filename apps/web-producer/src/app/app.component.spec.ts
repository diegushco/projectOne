// /* tslint:disable:no-unused-variable */

// import { TestBed, async } from '@angular/core/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { AppComponent } from './app.component';
// import { AppRoutingModule } from './app-routing.module';
// import { AuthModule } from '@sura-platform/web';
//
// import { SharedModule } from './features/shared/shared.module';

// describe('AppComponent', () => {
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         AppRoutingModule,
//         AuthModule,
//         SharedModule,
//         HttpClientTestingModule,
//       ],
//       declarations: [AppComponent],
//     }).compileComponents();
//   }));
//   it('should create the app', async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app).toBeTruthy();
//   }));
// it('should render xplat hello in a h2 tag', async(() => {
//   spyOn(translate, 'getBrowserLang').and.returnValue('en');
//   translate.use('en');
//   const fixture = TestBed.createComponent(AppComponent);
//   const compiled = fixture.debugElement.nativeElement;

//   // the DOM should be empty for now since the translations haven't been rendered yet
//   expect(compiled.querySelector('h1').textContent).toEqual('');

//   // http.expectOne('/assets/i18n/en.json').flush(translationsEn);

//   // Finally, assert that there are no outstanding requests.
//   http.verify();
//   fixture.detectChanges();

//   expect(compiled.querySelector('router-outlet'));
// }));
// });
