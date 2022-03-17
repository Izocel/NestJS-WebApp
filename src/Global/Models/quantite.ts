import * as mongoose from 'mongoose';
const { Schema } = mongoose;

export const QuantiteSchema = new Schema({
    type: {type: String, required: true},
    type_unite_mesure: {type: String, required: true},
    unite_mesure: {type: String, required: true},
    nombre: {type: Number, required: true}
});