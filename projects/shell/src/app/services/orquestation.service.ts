import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CookiesService } from './cookies.service';
import { NotificationService } from './notification.service';

const STORAGE_KEY = makeStateKey<any>('STORAGE_KEY');

var OrchestrationEngine = require('orchestration-engine');

@Injectable({
  providedIn: 'root'
})
export class OrquestationService {

  subscription: Subscription = null;

  json: string = `
  {
    "id": "6ce94be8-abf6-4486-b7c3-2abfddd519dd",
    "name": "workflow de prueba",
    "input": {
        "nombre": "prueba",
        "identificacion": "123456789",
        "codigo": "1",
        "task_two_name": "task two",
        "task_three_name": "task three",
        "task_four_name": "task four"
    },
    "start": "task two",
    "tasks": [{
        "name": "task one",
        "type": "HTTP",
        "inputParameters": {
            "name": "nombre"
        },
        "method": "GET",
        "url": "https://jsonplaceholder.typicode.com/todos/1",
        "outputParameters": "task_one",
        "headers": [{
            "key": "Authorization",
            "value": "123456789"
        }],
        "next": "task finished"
    }, {
        "name": "task two",
        "inputParameters": {
            "name": "nombre"
        },
        "type": "EXECUTION_MODULE",
        "nameExecutionModule": "src/app/module1/module1.module#Home",
        "outputParameters": "task_two",
        "path": "/seguros-en-linea/seguro-accidentes-personales/module1",
        "next": "task three"
    }, {
        "name": "task three",
        "inputParameters": {
            "name": "nombre",
            "return": "task_two_name"
        },
        "type": "EXECUTION_MODULE",
        "nameExecutionModule": "src/app/module1/module1.module#Validacion",
        "path": "/seguros-en-linea/seguro-accidentes-personales/module2",
        "next": "task four"
    }, 
    {
      "name": "task four",
      "inputParameters": {
          "name": "nombre",
          "return": "task_three_name"
      },
      "type": "EXECUTION_MODULE",
      "nameExecutionModule": "src/app/module1/module1.module#Validacion",
      "path": "/seguros-en-linea/seguro-accidentes-personales/module3",
      "next": "task five"
    },
    {
      "name": "task five",
      "inputParameters": {
          "name": "nombre",
          "return": "task_four_name"
      },
      "type": "EXECUTION_MODULE",
      "nameExecutionModule": "src/app/module1/module1.module#Validacion",
      "path": "/seguros-en-linea/seguro-accidentes-personales/module4",
      "next": "task finished"
    },
    {
        "name": "set parameter",
        "parameter": "customParameter",
        "value": "Valor de prueba",
        "type": "SET",
        "next": "task three"
    }, {
        "name": "task finished",
        "type": "FINISH"
    }]
}

        `;
  obj: any = {};

  objServer: any = {};

  taskPath: string;

  service: any = {}

  taskObservable: Observable<string>;

  stateKey: any;

  isBrowser: boolean = false;

  stateData: any;

  storage: any;

  request: any;

  constructor(private notificationService: NotificationService,
    private router: Router,
    private transferState: TransferState,
    private cookieService: CookiesService,
    @Inject(PLATFORM_ID) platformId: any,
    private injector:Injector) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser && this.transferState.hasKey(STORAGE_KEY)) {
      this.stateData = this.transferState.get<any | null>(STORAGE_KEY, null);
      // console.log('stateData', this.stateData);

    } else if(isPlatformServer(platformId)) {
      console.log('else ,,,,,');
      
      // this.request = this.injector.get(REQUEST);
      this.request = {originalUrl: '/'};
      console.log('CONSTRUCTOR REQUEST', this.request.originalUrl);
    }
  }

  call() {
    let self = this;
    this.service = {
      mount(input: any, task: any): Promise<any> {
        let promise = new Promise((resolve, reject) => {
          self.subscription = self.notificationService.notificationEvent().subscribe((res: any) => {
            console.log("Finaliza Módulo!!!");
            console.log('Resolve ---->', res);
            resolve(res);
            self.subscription.unsubscribe();
          });
        });
        self.taskObservable = new Observable((observer) => {
          observer.next(task.path);

        })
        console.log("navigateByUrl(" + task.path + ") - service Guard");
        self.router.navigateByUrl(task.path);
        self.notificationService.setData({input: input, path: task.path});
        this.taskPath = task.path;
        return promise;
      }
    }

    if (this.isBrowser) {
      let obj = this.cookieService.getItem('objeto') ? this.cookieService.getItem('objeto') : JSON.stringify({});
      this.cookieService.setItem('objeto', obj);
      this.storage = {
        getFromRoute: function (route) {
          var obj = JSON.parse(self.cookieService.getItem('objeto'));
          return obj[route];
        },
        save: function (data) {
          var obj = JSON.parse(self.cookieService.getItem('objeto'));
          obj = data;
          self.cookieService.setItem('objeto', JSON.stringify(obj));
        },
        saveOnRoute: function (route, data) {
          var obj = JSON.parse(self.cookieService.getItem('objeto'));
          obj[route] = data;
          self.cookieService.setItem('objeto', JSON.stringify(obj));
        }
      };

      let requestUrl = this.stateData !== '/' ? this.stateData : '';
      console.log('OrchestrationEngine run Browser', this.stateData);
      OrchestrationEngine.load(this.json, this.storage, this.service);
      OrchestrationEngine.run(requestUrl ? requestUrl : null);
    } 
    else {

      // console.log('REQUEST', this.req);
      

      let obj = this.cookieService.getItem('objeto') ? this.cookieService.getItem('objeto') : JSON.stringify({});
      this.cookieService.setItem('objeto', obj);

      let storageServer = {
        getFromRoute: (route) => {
          var objServer = {};
          objServer = JSON.parse(self.cookieService.getItem('objeto'));
          return objServer[route + ''];
        },
        save: (data) => {
          var objServer = {};
          objServer = JSON.parse(self.cookieService.getItem('objeto'));
          objServer = data;
          self.cookieService.setItem('objeto', JSON.stringify(objServer));
        },
        saveOnRoute: (route, data) => {
          var objServer = {};
          objServer = JSON.parse(self.cookieService.getItem('objeto'));
          objServer[route] = data;
          self.cookieService.setItem('objeto', JSON.stringify(objServer));
        }
      };
      // this.transferState.set(STORAGE_KEY, 'Hola');
      console.log('OrchestrationEngine run Server', this.request.originalUrl);
      let requestUrl = this.request.originalUrl !== '/' ? this.request.originalUrl : '';

      this.transferState.onSerialize(STORAGE_KEY, () => this.request.originalUrl);
      OrchestrationEngine.load(this.json, storageServer, this.service);
      OrchestrationEngine.run(requestUrl ? requestUrl : null);
    }
    
  }


  load(): void {
    console.log("load() - orchestrationEngine Guard");
    OrchestrationEngine.load(this.json, this.storage, this.service);
  }

  run(): void {
    console.log("run() - orchestrationEngine Guard");
    OrchestrationEngine.run();
  }
}
