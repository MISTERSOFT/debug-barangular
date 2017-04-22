# Debug Barangular

Debug Barangular is a simple debug bar for Angular.

- [Debug Barangular](#debug-barangular)
    - [How to install](#how-to-install)
    - [How to use](#how-to-use)
    - [Plugin build-in](#plugin-build-in)
    - [How to implement my own plugin](#how-to-implement-my-own-plugin)
    - [Help me to improve this project](#help-me-to-improve-this-project)

## How to install
```
npm install debug-barangular --save
```

## How to use

Import DebugBarangularModule into your app module.

```typescript
import { NgModule } from '@angular/core';
import { DebugBarangularModule } from 'debug-barangular';

@NgModule({
  imports: [DebugBarangularModule.forRoot()]
})
export class AppModule { }
```

Use the html tag "**sh-debug-bar**" into your *app.component.html* for exemple.
```html
<sh-debug-bar></sh-debug-bar>
```

## Plugin build-in

Debug Barangular comes with 1 plugin :

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

![Console](http://images.sofianehamadi.me/projects/bebug-barangular/debugbarangular1.PNG)

<!--- **Routes**: Display all routes of your application with more informations like parameters, guards and redirection.-->


## How to implement my own plugin

1. You have to create a Component and implement the interface **_IDebugBarPlugin_** and add the decorator **_DebugBarPluginComponent_** to your Component.
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
  imports: [DebugBarangularModule.forRoot()]
  declarations: [...]
  entryComponents: [MyPluginComponent],
  bootstrap: [...]
})
```

3. You have to tell to the debug bar that you want add your plugin. So, into your **app.component.ts** import the **_DebugBarService_** and use the method **_addPlugins()_** and also the class **_DebugBarPluginItem_**.
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

## Help me to improve this project

You think that project can be better and you have any suggestion then [open an issue](https://github.com/MISTERSOFT/debug-barangular/issues) and we will discuss it :).
