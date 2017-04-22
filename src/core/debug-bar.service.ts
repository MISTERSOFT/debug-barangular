import { ConsoleComponent } from './../plugins/console/console.component';
import { DebugBarPluginItem } from './classes';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RoutesComponent } from './../plugins/routes/routes.component';

@Injectable()
export class DebugBarService {

  private plugins: DebugBarPluginItem[] = [];

  constructor() {
    this.plugins = [
      new DebugBarPluginItem(ConsoleComponent, []),
      new DebugBarPluginItem(RoutesComponent, [])
    ];
  }

  getAllAddons(): DebugBarPluginItem[] {
    return this.plugins;
  }

  /**
   * Add addons
   * @param addonNames {any}
   */
  addPlugins(pluginItem: DebugBarPluginItem[]): void {
    this.plugins.concat(pluginItem);
  }

}
