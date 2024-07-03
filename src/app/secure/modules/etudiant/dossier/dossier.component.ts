import { Component, Input } from '@angular/core';
import { DetailDossier } from '../../../../core/models/detail';
import { AnneeScolaireList } from '../../../../core/models/annee.scolaire';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-dossier',
  standalone: true,
  imports: [QRCodeModule],
  templateUrl: './dossier.component.html',
  styleUrl: './dossier.component.css'
})
export class DossierComponent {
  @Input({ required: true }) detailDossier!: DetailDossier;
  @Input({ required: true }) anneeEncours!: AnneeScolaireList;
  @Input({ required: true }) lienQrCode!: string;
}
