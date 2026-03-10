import { Injectable, signal, computed } from '@angular/core';
import { Photo } from '../models/photo.model';

@Injectable({ providedIn: 'root' })
export class GalleryService {
  private readonly _photos = signal<Photo[]>([]);
  private readonly _loading = signal(false);
  private readonly _selectedPhoto = signal<Photo | null>(null);
  private readonly _searchQuery = signal('');

  readonly photos = this._photos.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly selectedPhoto = this._selectedPhoto.asReadonly();
  readonly searchQuery = this._searchQuery.asReadonly();

  readonly filteredPhotos = computed(() => {
    const list = this._photos();
    const query = this._searchQuery().trim().toLowerCase();
    if (!query) return list;
    return list.filter(
      (p) =>
        p.alt.toLowerCase().includes(query) ||
        p.author.toLowerCase().includes(query)
    );
  });

  readonly selectedIndex = computed(() => {
    const selected = this._selectedPhoto();
    if (!selected) return -1;
    return this._photos().findIndex((p) => p.id === selected.id);
  });

  readonly hasSelection = computed(() => this._selectedPhoto() !== null);

  setSearchQuery(query: string): void {
    this._searchQuery.set(query);
  }

  selectPhoto(photo: Photo | null): void {
    this._selectedPhoto.set(photo);
  }

  selectByIndex(index: number): void {
    const list = this._photos();
    if (index >= 0 && index < list.length) {
      this._selectedPhoto.set(list[index]);
    }
  }

  nextPhoto(): void {
    const idx = this.selectedIndex();
    if (idx < 0) return;
    const list = this._photos();
    this._selectedPhoto.set(list[(idx + 1) % list.length]);
  }

  previousPhoto(): void {
    const idx = this.selectedIndex();
    if (idx < 0) return;
    const list = this._photos();
    this._selectedPhoto.set(list[(idx - 1 + list.length) % list.length]);
  }

  closeLightbox(): void {
    this._selectedPhoto.set(null);
  }

  async loadPhotos(count = 24): Promise<void> {
    this._loading.set(true);
    // Yield so change detection can run and the template shows the loading state
    await new Promise<void>((resolve) => setTimeout(resolve, 0));
    try {
      const base = 'https://picsum.photos';
      const photos: Photo[] = [];
      const seen = new Set<number>();

      while (photos.length < count) {
        const n = Math.floor(Math.random() * 1000) + 1;
        if (seen.has(n)) continue;
        seen.add(n);
        photos.push({
          id: `photo-${n}`,
          src: `${base}/1200/800?random=${n}`,
          thumb: `${base}/400/300?random=${n}`,
          alt: `Foto ${n}`,
          author: `Autor ${n}`,
          width: 1200,
          height: 800,
        });
      }

      this._photos.set(photos);
    } finally {
      this._loading.set(false);
    }
  }
}
