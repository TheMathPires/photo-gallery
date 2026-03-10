import { Component, input, output } from '@angular/core';
import { Photo } from '../../models/photo.model';

@Component({
  selector: 'app-photo-card',
  standalone: true,
  imports: [],
  templateUrl: './photo-card.component.html',
  styleUrl: './photo-card.component.scss',
})
export class PhotoCardComponent {
  readonly photo = input.required<Photo>();
  readonly clicked = output<Photo>();

  onCardClick(): void {
    this.clicked.emit(this.photo());
  }
}
