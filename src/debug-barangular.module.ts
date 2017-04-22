import { CommonModule } from '@angular/common';
import { ConsoleComponent } from './plugins/console/console.component';
import { ConsoleService } from './plugins/console/console.service';
import { DebugBarComponent } from './debug-bar.component';
import { DebugBarService } from './core/debug-bar.service';
import { ModuleWithProviders, NgModule } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { RoutesComponent } from './plugins/routes/routes.component';

@NgModule({
  declarations: [
    DebugBarComponent,
    ConsoleComponent
    // RoutesComponent
  ],
  imports: [
    CommonModule
    // HttpModule
    // RouterModule
  ],
  exports: [
    DebugBarComponent
  ],
  providers: [],
  entryComponents: [
    ConsoleComponent
    // RoutesComponent
  ]
})
export class DebugBarangularModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DebugBarangularModule,
      providers: [
        DebugBarService,
        ConsoleService
      ]
    };
  }
}
