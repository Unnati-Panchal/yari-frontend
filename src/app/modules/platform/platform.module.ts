import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {PlatformRoutingModule} from '~platform/platform-routing.module';

import {PlatformComponent} from '~platform/platform.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  declarations: [PlatformComponent],
    imports: [
        CommonModule,
        PlatformRoutingModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatSidenavModule
    ]
})
export class PlatformModule { }
