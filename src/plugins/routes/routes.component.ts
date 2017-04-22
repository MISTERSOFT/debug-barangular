import { Component, OnInit } from '@angular/core';
import { DebugBarPluginComponent, IDebugBarPlugin } from './../../core';
import { Router } from '@angular/router';

@DebugBarPluginComponent
@Component({
  selector: 'debug-bar-plugin-routes',
  template: `
    <table class="table">
      <thead>
        <tr>
          <th>URL</th>
          <th>Component</th>
          <th>Guards</th>
          <th>Redirect</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let route of data">
          <td>/{{ route.path }}</td>
          <td>{{ route.component.name }}</td>
          <td>
            <ul>
              <li *ngIf="hasGuard(route, 'canActivate')">
                <b>canActivate</b>
                <ul>
                  <li *ngFor="let guard of route['canActivate']">
                    {{ guard.name }}
                  </li>
                </ul>
              </li>
              <li *ngIf="hasGuard(route, 'canDeactivate')">
                <b>canDeactivate</b>
                <ul>
                  <li *ngFor="let guard of route['canDeactivate']">
                    {{ guard.name }}
                  </li>
                </ul>
              </li>
              <li *ngIf="hasGuard(route, 'canActivateChild')">
                <b>canActivateChild</b>
                <ul>
                  <li *ngFor="let guard of route['canActivateChild']">
                    {{ guard.name }}
                  </li>
                </ul>
              </li>
              <li *ngIf="hasGuard(route, 'canLoad')">
                <b>canLoad</b>
                <ul>
                  <li *ngFor="let guard of route['canLoad']">
                    {{ guard.name }}
                  </li>
                </ul>
              </li>
              <li *ngIf="hasGuard(route, 'loadChildren')">
                <b>loadChildren</b>
                <ul>
                  <li *ngFor="let guard of route['loadChildren']">
                    {{ guard.name }}
                  </li>
                </ul>
              </li>
            </ul>
          </td>
          <td>
            {{ route.redirectTo }}
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [`
    .table {
      border-collapse: collapse;
    }

    .table thead {
      background-color: #1b1e24;
      color: #fff;
    }

    .table th, .table tr {
      border-bottom: 1px solid #000;
      padding: 10px 30px;
    }

    .table tbody tr td {
      padding: 5px;
    }
  `]
})
export class RoutesComponent implements IDebugBarPlugin, OnInit {

  name = 'Routes';
  data: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.data = this.router.config;
  }

  hasGuard(route: any, guardType: string) {
    return route.hasOwnProperty(guardType);
  }

}
