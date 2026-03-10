import { Component } from '@angular/core';
import { GalleryComponent } from './components/gallery/gallery.component';
import { LightboxComponent } from './components/lightbox/lightbox.component';

@Component({
  selector: 'app-root',
  imports: [GalleryComponent, LightboxComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
