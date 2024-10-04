import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {config, INITIAL_CONFIG, initialConfig, NEW_CONFIG, optionsConfig} from "../model/config";
import {SecurityGuard} from "./security.guard";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SecurityModule {

  public static forRoot(configValue?: optionsConfig): ModuleWithProviders<any> {
    return {
      ngModule: SecurityModule,
      providers: [
        {
          provide: NEW_CONFIG,
          useValue: configValue
        },
        {
          provide: INITIAL_CONFIG,
          useValue: initialConfig
        },
        {
          provide: config,
          useFactory: _configFactory,
          deps: [INITIAL_CONFIG, NEW_CONFIG]
        },
        SecurityGuard
      ]
    };
  }
}

/**
 * @internal
 */
export function _configFactory(initConfig: optionsConfig, configValue: optionsConfig | (() => optionsConfig)): Function | optionsConfig {
  return (typeof configValue === 'function') ? configValue() : { ...initConfig, ...configValue };
}
