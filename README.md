# Debug Barangular

Debug Barangular is a simple debug bar for Angular.

- [Debug Barangular](#debug-barangular)
    - [How to use](#how-to-use)
    - [Plugins build-in](#plugins-build-in)
    - [How to implement my own plugin](#how-to-implement-my-own-plugin)

## How to use

Import DebugBarangularModule into your app module.

```typescript
import { NgModule } from '@angular/core';
import { DebugBarangularModule } from 'debug-barangular';

@NgModule({
  imports: [DebugBarangularModule]
})
export class AppModule { }
```

Use the html tag "**sh-debug-bar**" into your *app.component.html* for exemple.
```html
<sh-debug-bar></sh-debug-bar>
```

## Plugins build-in

Debug Barangular comes with 2 plugins that I developed:

- **Console**: It's a console where you can print everything you want with the *ConsoleService*. This is not comparable with any browser console.

```typescript
/**
 * test.component.ts
 */
import { Component, OnInit } from '@angular/core';
import { ConsoleService } from 'debug-barangular';

@Component({
  selector: 'app-test',
  template: `
    <input type="text" [(value)]="myValue" (keyup)="update()">
  `
})
export class TestComponent implements OnInit {
  myValue: string = 'Sample';

  constructor(private consoleService: ConsoleService) { }

  ngOnInit() {
    // # Sample 1
    // The value will be printed into the Console
    // Note: Your can put value of any type
    this.consoleService.setValue('my test value');

    // # Sample 2
    this.consoleService.setValue([1,2,3]);
  }

  update() {
    // # Sample 3
    this.consoleService.setValue(this.myValue);
  }
}
```

![Image of Yaktocat](http://images.sofianehamadi.me/dev/bebug-barangular/debugbarangular1.PNG)

- **Routes**: Display all routes of your application with more informations like parameters, guards and redirection.

![Image of Yaktocat](http://images.sofianehamadi.me/dev/bebug-barangular/debugbarangular2.PNG)

## How to implement my own plugin

1. You have to create a Component and implement the interface **_IDebugBarPlugin_** and the decorator **_DebugBarPluginComponent_**.
```typescript
import { IDebugBarPlugin, DebugBarPluginComponent } from 'debug-barangular';

@DebugBarPluginComponent // use the decorator
@Component({...})
export class MyPluginComponent implements IDebugBarPlugin {
  /**
   * Title of the plugin.
   * This is for the tab.
   */
  name: string;

  /**
   * Data that you want pass to your debug bar plugin component.
   */
  data: any;
}
```

2. Add your plugin as **_entryComponents_** into the **app.module.ts** file.
```typescript
import { MyPluginComponent } from './my-plugin.component';

@NgModule({
  imports: [...]
  declarations: [...]
  entryComponents: [MyPluginComponent],
  bootstrap: [...]
})
```

3. You have to tell to the debug bar that you want create your plugin. So, into your **app.component.ts** import the **_DebugBarService_** and use the method **_addPlugins()_** and also the class **_DebugBarPluginItem_**.
```typescript
import { DebugBarService, DebugBarPluginItem } from 'debug-barangular';
import { MyPluginComponent } from './my-plugin.component';

@Component({...})
export class AppComponent {
  constructor(private debugBarService: DebugBarService) {
    // The method only takes as parameters an array of DebugBarPluginItem object.
    // 1fst arg : Type of your plugin
    // 2nd arg : Data that you want pass to your plugin component
    this.debugBarService.addPlugins([
      new DebugBarPluginItem(MyPluginComponent, [])
    ]);
  }
}
```
