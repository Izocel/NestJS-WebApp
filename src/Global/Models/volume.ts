import * as mongoose from 'mongoose';
const { Schema } = mongoose;

export const VolumeSchema = new Schema({
    unite_mesure: {type: String, required: true},
    hauteur: {type: Number, required: true},
    largeur: {type: Number, required: true},
    profondeur: {type: Number, required: true}
});