import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// components
import { DebugBarComponent } from './debug-bar.component';

// services
import { DebugBarService } from './core/debug-bar.service';
import { ConsoleService } from './plugins/console/console.service';

// components - Debug bar plugins
import { ConsoleComponent } from './plugins/console/console.component';
import { RoutesComponent } from './plugins/routes/routes.component';

@NgModule({
  declarations: [
    DebugBarComponent,
    ConsoleComponent,
    RoutesComponent
  ],
  imports: [
    CommonModule,
    HttpModule
  ],
  exports: [
    DebugBarComponent
  ],
  providers: [
    DebugBarService,
    ConsoleService
  ],
  entryComponents: [
    ConsoleComponent,
    RoutesComponent
  ]
})
export class DebugBarangularModule { }
