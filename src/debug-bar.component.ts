import {
  Component,
  OnInit,
  ViewChild,
  Renderer2,
  ElementRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  ComponentRef,
  ReflectiveInjector,
  Input
} from '@angular/core';

import {
  DebugBarService,
  DebugBarPluginItem,
  IDebugBarPlugin
} from './core';

@Component({
  selector: 'sh-debug-bar',
  template: `
    <div class="container hide" #debugBar>
      <div class="menu">
        <ul class="left">
          <li *ngFor="let plugin of debugBarPlugins" (click)="onTabClick(plugin.instance)">
            <i class="mdi {{ plugin.instance.icon }} mdi-18px"></i>
            {{ plugin.instance.name }}
          </li>
        </ul>
        <ul class="right">
          <li (click)="onDisplayDebugBar()">
            <i class="mdi mdi-chevron-double-up mdi-18px" #iconDisplayDebugBar></i>
          </li>
        </ul>
      </div>
      <div class="content">
        <ng-template #addonsContainer></ng-template>
      </div>
    </div>
  `,
  styles: [`
    * {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }

    .container {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;

      height: 500px;

      background: #1b1e24;

      transition: height .2s;
    }

    .menu {
      height: 30px;
      border-bottom: 1px solid #343a45;
      color: white;
    }

    .left, .right {
      display: inline-block;
      list-style-type: none;
      line-height: 30px;
    }

    .left { float: left; }

    .right { float: right; }

    .left li, .right li {
      float: left;
      border-right: 1px solid #343a45;
      padding: 0 10px;

      cursor: pointer;
      user-select: none;
    }

    .left li:hover, .right li:hover {
      background-color: slategray;
    }

    .hide {
      height: 30px;
    }

    .content {
      height: 450px;

      padding: 10px;
      overflow-y: scroll;

      background-color: #fff;
    }
  `]
})
export class DebugBarComponent implements OnInit {

  @Input() customPlugins: DebugBarPluginItem[];

  @ViewChild('debugBar') debugBar: ElementRef;
  @ViewChild('iconDisplayDebugBar') iconDisplayDebugBar: ElementRef;
  @ViewChild('addonsContainer', { read: ViewContainerRef }) pluginsContainer: ViewContainerRef;

  private isDebugBarDisplayed = false;
  private cssClasses: any;

  debugBarPlugins: ComponentRef<any>[] = [];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private renderer: Renderer2,
    private debugBarService: DebugBarService) { }

  ngOnInit() {
    this.cssClasses = {
      hideDebugBar: 'hide',
      icons: {
        up: 'mdi-chevron-double-up',
        down: 'mdi-chevron-double-down'
      }
    };

    // create all addons components
    for (const plugin of this.debugBarService.getAllAddons()) {
      this.createComponent(plugin);
    }
    // display select first addon
    if (this.debugBarPlugins.length > 0) {
      this.hideAddons();
      this.showAddon(this.debugBarPlugins[0].instance);
    }
  }

  /**
   * Create component
   */
  private createComponent(pluginItem: DebugBarPluginItem): void {
    if (!pluginItem.component) {
      return;
    }

    // resolve component
    const factory = this.componentFactoryResolver.resolveComponentFactory(pluginItem.component);
    // create the plugin component
    const pluginComponent = this.pluginsContainer.createComponent(factory);
    (<IDebugBarPlugin> pluginComponent.instance).data = pluginItem.data;

    this.debugBarPlugins.push(pluginComponent);
  }

  /**
   * Show and hide the debug bar
   */
  onDisplayDebugBar(): void {
    if (!this.isDebugBarDisplayed) {
      // Display debug bar
      this.renderer.removeClass(this.debugBar.nativeElement, this.cssClasses.hideDebugBar);
      // change icon
      this.renderer.removeClass(this.iconDisplayDebugBar.nativeElement, this.cssClasses.icons.up);
      this.renderer.addClass(this.iconDisplayDebugBar.nativeElement, this.cssClasses.icons.down);
    } else {
      // Hide debug bar
      this.renderer.addClass(this.debugBar.nativeElement, this.cssClasses.hideDebugBar);
      // change icon
      this.renderer.removeClass(this.iconDisplayDebugBar.nativeElement, this.cssClasses.icons.down);
      this.renderer.addClass(this.iconDisplayDebugBar.nativeElement, this.cssClasses.icons.up);
    }

    this.isDebugBarDisplayed = !this.isDebugBarDisplayed;
  }

  /**
   * Display addon tab on click
   * @param addon {any}
   */
  onTabClick(plugin: any): void {
    this.hideAddons();
    this.showAddon(plugin);
  }

  /**
   * Hide debug-bar content
   */
  hideContent() {
    for (const plugin of this.debugBarPlugins) {
      if (plugin.instance.isVisible) {
        plugin.instance.isVisible = false;
        this.renderer.setStyle(plugin['_view'].nodes[0].renderElement, 'display', 'none');
      }
    }
  }

  /**
   * Hide all addons templates
   */
  private hideAddons() {
    for (const plugin of this.debugBarPlugins) {
      if (plugin.instance.isVisible) {
        plugin.instance.isVisible = false;
        this.renderer.setStyle(plugin['_view'].nodes[0].renderElement, 'display', 'none');
      }
    }
  }

  /**
   * Show the clicked addon template
   * @param type {any}
   */
  private showAddon(type) {
    for (const plugin of this.debugBarPlugins) {
      if (plugin.instance instanceof type.constructor) {
        plugin.instance.isVisible = true;
        this.renderer.setStyle(plugin['_view'].nodes[0].renderElement, 'display', 'block');
        return;
      }
    }
  }

}
