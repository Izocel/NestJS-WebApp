import * as mongoose from 'mongoose';
const { Schema } = mongoose;

export const PoidsSchema = new Schema({
    unite_mesure: {type: String, required: true},
    valeur: {type: Number, required: true}
});