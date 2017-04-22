import { Component, OnInit } from '@angular/core';
import { DebugBarPluginComponent, IDebugBarPlugin } from './../../core';
import { ConsoleService } from './console.service';

@DebugBarPluginComponent
@Component({
  selector: 'debug-bar-plugin-console',
  template: '<pre [innerHTML]="data"></pre>',
  styles: [`
    pre {
      white-space: pre-wrap;
      white-space: -moz-pre-wrap;
      white-space: -pre-wrap;
      white-space: -o-pre-wrap;
      word-wrap: break-word;
    }
  `]
})
export class ConsoleComponent implements OnInit, IDebugBarPlugin {

  name = 'Console';
  data: any;

  constructor(private consoleService: ConsoleService) { }

  ngOnInit(): void {
    this.consoleService.getValue().subscribe((value) => {
      this.data = JSON.stringify(value, undefined, 2);
    });
  }

}
