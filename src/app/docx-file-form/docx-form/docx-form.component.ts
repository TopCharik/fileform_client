import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DocxFileFormService} from "../docx-file-form.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {ApiError} from "../models/apiError";

@Component({
  selector: 'app-docx-form',
  templateUrl: './docx-form.component.html',
  styleUrls: ['./docx-form.component.css']
})
export class DocxFormComponent implements OnInit {
  error?: ApiError;
  filenameValid = true;
  disabled = false;

  constructor(private router: Router, private formService: DocxFileFormService) {
  }


  ngOnInit(): void { }

  fileForm: FormGroup = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    file: new FormControl<string>('', [Validators.required]),
    fileSource: new FormControl<File | null>(null, [Validators.required])
  });


  onSubmit() {
    const formData = new FormData();
    formData.append('email', this.fileForm.get('email')?.value);
    formData.append('file', this.fileForm.get('fileSource')?.value);
    this.disabled = true;
    this.formService.submitDocxForm(formData)
      .subscribe({
      next: () => {
        this.disabled = false;
        localStorage.setItem("canActivateSuccess", "true");
        this.router.navigate(["/docx-form-success"]);
      },
      error: (err: HttpErrorResponse) => {
        this.error = err.error;
        this.disabled = false;
        this.router.navigate(["/docx-form-success"]);
        setTimeout( () => this.error = undefined, 10000);
      },
    });
  }

  onFileChange($event: Event) {
    const element = $event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      const file = fileList[0];
      this.filenameValid = this.isDocx(file.name);
      this.fileForm.patchValue({
        fileSource: file,
      });
    }
  }

  private isDocx(fileName: string) {
    const extension = fileName.split('.').pop();
    return extension === "docx";
  }
}
