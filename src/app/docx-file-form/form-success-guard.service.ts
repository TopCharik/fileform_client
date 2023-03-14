import { Injectable } from '@angular/core';
import {CanActivate} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class FormSuccessGuardService implements CanActivate{
  constructor() { }

  canActivate(): boolean {
    const isSuccess = localStorage.getItem("canActivateSuccess");
    localStorage.setItem("canActivateSuccess", "false");
    return isSuccess === "true";
  }
}
