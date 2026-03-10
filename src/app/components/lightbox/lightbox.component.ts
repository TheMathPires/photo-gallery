import {
  Component,
  inject,
  HostListener,
  effect,
  signal,
  computed,
} from '@angular/core';
import { GalleryService } from '../../services/gallery.service';
@Component({
  selector: 'app-lightbox',
  standalone: true,
  imports: [],
  templateUrl: './lightbox.component.html',
  styleUrl: './lightbox.component.scss',
})
export class LightboxComponent {
  private readonly gallery = inject(GalleryService);

  readonly photo = this.gallery.selectedPhoto;
  readonly loading = signal(true);
  readonly loadError = signal(false);

  readonly imgLoaded = computed(() => !this.loading());

  constructor() {
    effect(() => {
      const p = this.gallery.selectedPhoto();
      this.loading.set(!!p);
      this.loadError.set(false);
    });
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): void {
    if (!this.gallery.hasSelection()) return;
    switch (e.key) {
      case 'Escape':
        this.close();
        break;
      case 'ArrowRight':
        this.gallery.nextPhoto();
        break;
      case 'ArrowLeft':
        this.gallery.previousPhoto();
        break;
    }
  }

  onImageLoad(): void {
    this.loading.set(false);
    this.loadError.set(false);
  }

  onImageError(): void {
    this.loading.set(false);
    this.loadError.set(true);
  }

  close(): void {
    this.gallery.closeLightbox();
  }

  next(e: Event): void {
    e.stopPropagation();
    this.gallery.nextPhoto();
    this.loading.set(true);
  }

  previous(e: Event): void {
    e.stopPropagation();
    this.gallery.previousPhoto();
    this.loading.set(true);
  }

  backdropClick(e: Event): void {
    if ((e.target as HTMLElement).classList.contains('lightbox-backdrop')) {
      this.close();
    }
  }
}
