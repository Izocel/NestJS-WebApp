import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { ProduitFournisseursService } from './produitFournisseurs.service';

@Controller('produitFournisseur')
export class ProduitFournisseurController {
  constructor(private readonly produitFournisseurService: ProduitFournisseursService) {}

  @Post()
  async addProduitFournisseur(
    @Body('nom') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('prix') prodPrix: number,
  ) {
    const generatedId = await this.produitFournisseurService.insertProduitFournisseur(
      prodTitle,
      prodDesc,
      prodPrix,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllProduitFournisseur() {
    const produitFournisseur = await this.produitFournisseurService.getProduitFournisseurs();
    return produitFournisseur;
  }

  @Get(':id')
  getProduitFournisseur(@Param('id') prodId: string) {
    return this.produitFournisseurService.getSingleProduitFournisseur(prodId);
  }

  @Patch(':id')
  async updateProduitFournisseur(
    @Param('id') prodId: string,
    @Body('nom') prodTitle: string,
    @Body('prix') prodPrix: number,
  ) {
    await this.produitFournisseurService.updateProduitFournisseur(prodId, prodTitle, prodPrix);
    return null;
  }

  @Delete(':id')
  async removeProduitFournisseur(@Param('id') prodId: string) {
      await this.produitFournisseurService.deleteProduitFournisseur(prodId);
      return null;
  }
}