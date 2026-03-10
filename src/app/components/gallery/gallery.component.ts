import { Component, inject, OnInit } from '@angular/core';
import { GalleryService } from '../../services/gallery.service';
import { PhotoCardComponent } from '../photo-card/photo-card.component';
import type { Photo } from '../../models/photo.model';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [PhotoCardComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent implements OnInit {
  private readonly gallery = inject(GalleryService);

  readonly filteredPhotos = this.gallery.filteredPhotos;
  readonly loading = this.gallery.loading;
  readonly searchQuery = this.gallery.searchQuery;

  ngOnInit(): void {
    this.gallery.loadPhotos(24);
  }

  onSearchInput(value: string): void {
    this.gallery.setSearchQuery(value);
  }

  onPhotoClick(photo: Photo): void {
    this.gallery.selectPhoto(photo);
  }
}
