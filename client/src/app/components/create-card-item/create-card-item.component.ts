import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Icard } from 'src/app/interfaces/icard';
import { CardStackServiceService } from 'src/app/services/card-stack-service.service';
import { EventEmitter } from '@angular/core';
import { catchError } from 'rxjs/operators';

import {CloudinaryImage} from '@cloudinary/url-gen';
import {URLConfig} from '@cloudinary/url-gen';
import {CloudConfig} from '@cloudinary/url-gen';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-card-item',
  templateUrl: './create-card-item.component.html',
  styleUrls: ['./create-card-item.component.css'],
})
export class CreateCardItemComponent implements OnInit {
  @Input() card!: Icard;
  @Output('getCardsFromStack') getCardsFromStack: EventEmitter<any> = new EventEmitter();

  cardForm!: FormGroup;
  imageForm!: FormGroup;
  message: string = '';
  errorMessage: any;

  selectedFile: any | null;

  constructor(
    private srvCardStacks: CardStackServiceService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    this.cardDataInitialiser();

    this.imageForm = this.formBuilder.group({ data: [''] });
  }

  onFileSelected(e: Event) {

    this.selectedFile = (e.target as HTMLInputElement).files![0];

  }

  onUpload() {

    const fd = new FormData

    fd.append('image', this.selectedFile, this.selectedFile.name)

    console.log(fd.get('image'));

    this.http.post('http://localhost:3000/image/upload', fd, {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      }),
      reportProgress: true, 
      observe: 'events'
    })
    .subscribe(
      (res) => {
        console.log(res);
      }
      // event => {
      // if (event.type === HttpEventType.UploadProgress) {
      //   console.log('Upload Progress: ' + (event.loaded / event.total!) * 100)
      // } if (event.type === HttpEventType.Response) {
      //   console.log(event);
      //} 
    )
  }

  cardDataInitialiser(): void {
    this.cardForm = new FormGroup({
      front: new FormControl([this.card?.Front]),
      back: new FormControl([this.card?.Back]),
      imageID: new FormControl([this.card?.ImageID]),
      imageURL: new FormControl([this.card?.ImageURL]),
    });
  }

  styleUpload(): object {
    return { display: this.card?.ImageURL ? 'block' : 'none' };
  }

  handleUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.imageForm.get('data')?.setValue(file);
    }

    const formData = new FormData();
    formData.append('file', this.imageForm.get('data')?.value);



    this.srvCardStacks.uploadImage(formData, this.card.CardID);
  }

  handleDelete() {
    //
  }

  get front() {
    return this.cardForm?.get('front');
  }
  get back() {
    return this.cardForm?.get('back');
  }

  get imgUrl() {
    return this.cardForm?.get('imageURL');
  }

  deleteCardFromStack() {
    this.srvCardStacks.deleteCardFromStack(this.card);

    this.getCardsFromStack.emit();
  }

  updateCardFromStack() {
    console.log(this.card.CardID);

    this.srvCardStacks
      .updateCardFromStack(this.card.CardID, this.cardForm.value)
      .subscribe({
        next: (card) => {
          console.log(JSON.stringify(card) + ' has been updated');
        },
        complete: () => this.getCardsFromStack.emit(),
        error: (error) => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        },
      });
  }
}
