import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { ProduitFournisseur } from "./produitFournisseurs.model";

@Injectable()
export class ProduitFournisseursService {
  constructor(
    @InjectModel("ProduitFournisseur") private readonly produitFournisseurModel,
  ) {}

  async insertProduitFournisseur(nom: string, desc: string, price: number) {
    const newProduitFournisseur = new this.produitFournisseurModel({
      nom,
      description: desc,
      price,
    });
    const result = await newProduitFournisseur.save();
    return result.id as string;
  }

  async getProduitFournisseurs() {
    const produitFournisseurs = await this.produitFournisseurModel.find().exec();
    if(produitFournisseurs.length < 1)
      throw new NotFoundException("Aucun produit fournisseurs trouvés.");
    return produitFournisseurs;
  }

  async getSingleProduitFournisseur(produitFournisseurId: string) {
    const produitFournisseur = await this.findProduitFournisseur(produitFournisseurId);
    return {
      id: produitFournisseur.id,
      nom: produitFournisseur.nom,
      prix: produitFournisseur.prix,
    };
  }

  async updateProduitFournisseur(
    produitFournisseurId: string,
    nom: string,
    prix: number,
  ) {
    const updatedProduitFournisseur = await this.findProduitFournisseur(produitFournisseurId);
    if (nom) {
      updatedProduitFournisseur.nom = nom;
    }
    if (prix) {
      updatedProduitFournisseur.prix = prix;
    }
    updatedProduitFournisseur.save();
  }

  async deleteProduitFournisseur(prodId: string) {
    const result = await this.produitFournisseurModel.deleteOne({_id: prodId}).exec();
    if (!result.acknowledged) {
      throw new NotFoundException("Could not find produitFournisseur.");
    }
  }

  private async findProduitFournisseur(id: string) {
    let produitFournisseur;
    try {
      produitFournisseur = await this.produitFournisseurModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException("Could not find produitFournisseur.");
    }
    if (!produitFournisseur) {
      throw new NotFoundException("Could not find produitFournisseur.");
    }
    return produitFournisseur;
  }
}