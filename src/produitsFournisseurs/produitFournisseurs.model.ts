import * as mongoose from 'mongoose';
import { PoidsSchema } from 'src/Global/Models/poids';
import { QuantiteSchema } from 'src/Global/Models/quantite';
import { VolumeSchema } from 'src/Global/Models/volume';
const { Schema } = mongoose;

export const ProduitsFournisseurSchema = new Schema({
  nom: {type: String, required: true },
  quantite: {type: QuantiteSchema, required: true },
  poids: {type: PoidsSchema, required: true},
  volume: {type: VolumeSchema, required: true},
  prix: {type: Number, required: true}
});
export const ProduitFournisseur = mongoose.model("produits_fournisseurs", ProduitsFournisseurSchema);
