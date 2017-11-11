//WARNING:
//Tokens should be declared in separate files to avoid circular dependency problems
//https://stackoverflow.com/questions/44023796/inject-for-injectiontoken-declared-in-module-fails-in-angular2

import { InjectionToken } from '@angular/core';

export const ENVIRONMENT_CONFIG = new InjectionToken('angular-environment');
export const __ = new InjectionToken('lodash');