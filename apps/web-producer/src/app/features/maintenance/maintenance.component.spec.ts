import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MaintenanceComponent } from './maintenance.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import {
  IMaintenanceSystem,
  SystemModuleStatusEnum
} from '@sura-platform/features';
import moment from 'moment';

const firstCase: IMaintenanceSystem = {
  name: 'portals',
  elements: [
    {
      module: 'producers',
      state: SystemModuleStatusEnum.AVAILABLE,
      comment: 'Planned platform maintenance',
      dateSince: '2020-08-06T16:15:00',
      dateUntil: '2020-08-10T10:00:00'
    }
  ]
};

describe('MaintenanceComponent', () => {
  let fixture: ComponentFixture<MaintenanceComponent>;
  let component: MaintenanceComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [MaintenanceComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MaintenanceComponent);
    component = fixture.componentInstance;
  });

  it('Component should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('When no dateUntil, should not contain date in message', () => {
    fixture.detectChanges();

    const lines: HTMLParagraphElement[] = fixture.debugElement
      .queryAll(By.css('.message>p'))
      .map((d) => d?.nativeElement);

    expect(lines[0].innerText).toBe('¡Ups! ¡Te pedimos disculpas!');
    expect(lines[1].innerText).toBe('Estamos haciendo algunas mejoras.');
    expect(lines[2].innerText).toBe('Por favor volvé a intentarlo más tarde.');
  });

  it('When a date is provided, a date an hour should be shown', () => {
    component.currentDate = moment(
      '2020-08-09T08:00:00',
      'YYYY-MM-DDTHH:mm:ssZ'
    );

    component.system = firstCase;

    fixture.detectChanges();

    const lines: HTMLParagraphElement[] = fixture.debugElement
      .queryAll(By.css('.message>p'))
      .map((d) => d?.nativeElement);

    expect(lines[2].innerText).toContain('10:00');
    expect(lines[2].innerText).toContain('10/08/2020');
  });

  it('When currentDate is lower than dateSince, then default message should be shown', () => {
    component.currentDate = moment(
      '2020-08-02T08:00:00',
      'YYYY-MM-DDTHH:mm:ssZ'
    );

    component.system = firstCase;

    fixture.detectChanges();

    const lines: HTMLParagraphElement[] = fixture.debugElement
      .queryAll(By.css('.message>p'))
      .map((d) => d?.nativeElement);

    expect(lines[2].innerText).toBe('Por favor volvé a intentarlo más tarde.');
  });
});
