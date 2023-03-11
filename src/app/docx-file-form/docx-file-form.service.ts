import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DocxFileFormService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  submitDocxForm(formData: FormData){
    return this.http.post(this.apiUrl + "/docx", formData);
  }
}
