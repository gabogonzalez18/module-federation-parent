import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  notificationSource = new Subject<any>();

  data: any;

  nextNotification(value: any) {
    this.notificationSource.next(value);
  }

  notificationEvent(): Observable<any> {
    return this.notificationSource.asObservable();
  }

  setData(data: any) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

}