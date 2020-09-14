import { ApplicationInsights, Util } from '@microsoft/applicationinsights-web';
import { Injectable } from '@angular/core';
import {
  Router,
  ResolveEnd,
  ActivatedRouteSnapshot,
  NavigationStart,
  NavigationEnd
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class MonitoringService {
  private appInsights: ApplicationInsights;

  constructor(private router: Router) {
    this.appInsights = new ApplicationInsights({
      config: {
        instrumentationKey: environment.appInsightInstrumentationKey
      }
    });
    this.appInsights.loadAppInsights();

    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.startNavigationEvent(event.url);
      } else if (event instanceof NavigationEnd) {
        this.endNavigationEvent(event.url);
        this.logPageView();
      }
    });

    this.router.events
      .pipe(filter((event) => event instanceof ResolveEnd))
      .subscribe((event: ResolveEnd) => {
        const activatedComponent = this.getActivatedComponent(event.state.root);
        if (activatedComponent) {
          this.logPageView(
            `${activatedComponent.name} ${this.getRouteTemplate(
              event.state.root
            )}`,
            event.urlAfterRedirects
          );
        }
      });
  }

  setUserId(userId: string) {
    this.appInsights.setAuthenticatedUserContext(btoa(userId), userId, true);
  }

  startTrackEvent(name?) {
    this.appInsights.startTrackEvent(name);
  }

  stopTrackEvent(name, properties?, measurements?) {
    this.appInsights.stopTrackEvent(name, properties, measurements);
  }

  clearUserId() {
    this.appInsights.clearAuthenticatedUserContext();
  }

  logPageView(name?: string, uri?: string) {
    this.appInsights.trackPageView({ name, uri });
  }

  private getActivatedComponent(snapshot: ActivatedRouteSnapshot): any {
    if (snapshot.firstChild) {
      return this.getActivatedComponent(snapshot.firstChild);
    }

    return snapshot.component;
  }

  private getRouteTemplate(snapshot: ActivatedRouteSnapshot): string {
    let path = '';
    if (snapshot.routeConfig) {
      path += snapshot.routeConfig.path;
    }

    if (snapshot.firstChild) {
      return path + this.getRouteTemplate(snapshot.firstChild);
    }

    return path;
  }

  startNavigationEvent(url: string) {
    if (this.appInsights.context) {
      this.appInsights.context.telemetryTrace.traceID = Util.newId();
      this.appInsights.context.telemetryTrace.name = url;
    }

    this.appInsights.startTrackEvent(url);
  }

  endNavigationEvent(url: string) {
    this.appInsights.stopTrackEvent(url, { type: 'PAGE LOAD TIME' });
  }

  trackMetric(
    name: string,
    average: number,
    properties?: { [key: string]: any }
  ) {
    this.appInsights.trackMetric({ name: name, average: average }, properties);
  }

  trackException(exception: Error, severityLevel?: number) {
    this.appInsights.trackException({
      exception: exception,
      severityLevel: severityLevel
    });
  }

  trackEvent(name: string, properties?: { [key: string]: any }) {
    this.appInsights.trackEvent({ name: name }, properties);
  }

  trackTrace(message: string, properties?: { [key: string]: any }) {
    this.appInsights.trackTrace({ message: message }, properties);
  }
}
