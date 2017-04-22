import { Type } from '@angular/core';

export class DebugBarPluginItem {
  /**
   * Constructor
   * @param component {Type<any>} Component to invoke
   * @param data {data} Data to give to the component
   */
  constructor(public component: Type<any>, public data: any) { }
}
