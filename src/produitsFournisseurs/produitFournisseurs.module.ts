import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProduitFournisseurController } from './produitFournisseurs.controller';
import { ProduitFournisseursService } from './produitFournisseurs.service';
import { ProduitsFournisseurSchema } from './produitFournisseurs.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ProduitFournisseur', schema: ProduitsFournisseurSchema }]),
  ],
  controllers: [ProduitFournisseurController],
  providers: [ProduitFournisseursService],
})
export class ProduitFournisseursModule {}