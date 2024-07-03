import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginationModel } from '../../../core/models/pagination.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  //On doit lui passer un data au moment ou on call le component; c'est le parent qui lui donne
  @Input({ required: true }) data!: PaginationModel;
  //un emetteur qui envoie des données vers le parent en remontant l'evenement
  @Output() onGetPageNumber:EventEmitter<number> = new EventEmitter();

  paginate(page: number) {
    this.onGetPageNumber.emit(page);
  }
}
