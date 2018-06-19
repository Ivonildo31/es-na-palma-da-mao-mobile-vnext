import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { EnvVariables, Environment, Params } from '@espm/core';
import { Observable } from 'rxjs/Observable';
import { EventItem, CalendarSummary } from '../model';
import { share, map } from 'rxjs/operators';

@Injectable()
export class CalendarApiService {
  /**
   *
   *
   */
  constructor(private http: HttpClient, @Inject(EnvVariables) private env: Environment) {}

  /**
   *
   *
   */
  public getAvailableCalendars(): Observable<CalendarSummary[]> {
    return this.http.get<CalendarSummary[]>(this.env.api.calendars).pipe(share());
  }

  /**
   *
   *
   */
  public getFullCalendars(calendars: string[] = [], filter = {}): Observable<EventItem[]> {
    let today = new Date();
    let defaults = {
      singleEvents: true,
      orderBy: 'startTime',
      timeMin: new Date(today.getFullYear(), 0, 1, 0).toISOString(), // começo do ano corrente
      timeMax: new Date(today.getFullYear(), 11, 31, 0).toISOString(), // final do ano corrente
      timeZone: 'America/Sao_Paulo'
    };

    let httpParams = this.toParams(Object.assign(defaults, filter));

    calendars.forEach(calendar => (httpParams = httpParams.append('calendars', calendar)));

    return this.http.get<EventItem[]>(`${this.env.api.calendars}/events`, { params: httpParams }).pipe(
      map(events =>
        events.map(event => {
          event.startTime = new Date(event.startTime);
          event.endTime = new Date(event.endTime);
          return event;
        })
      ),
      share()
    );
  }

  /**
   *
   *
   */
  private toParams(params: Params = {}) {
    let httpParams = new HttpParams();
    Object.keys(params)
      .filter(key => params[key] != null)
      .forEach(key => (httpParams = httpParams.append(key, params[key].toString())));
    return httpParams;
  }
}
