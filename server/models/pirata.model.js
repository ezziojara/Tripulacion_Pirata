const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const PirataSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Nombre es requerido"],
			minlength: [2, "Nombre debe tener al menos 2 caracteres"]
		},
        url: {
			type: String,
			required: [true, "URL es requerido"],
			minlength: [10, "URL debe tener al menos 10 caracteres"]
		},
        position: {
			type: String,
			required: [true, "Posición es requerido"]
		},
        pegLeg: {
			type: Boolean,
			required: [true, "Pata de Palo es requerido"]
		},
        eyePatch: {
			type: Boolean,
			required: [true, "Parche en el ojo es requerido"]
		},
        hookHand: {
			type: Boolean,
			required: [true, "Gancho de mano es requerido"]
		},
        treasure: {
			type: Number,
			required: [true, "Número de cofres de Tesoro es requerido"]
		},
        phrases: {
			type: String,
            minlength: [2, "Frases del pirata debe tener al menos 2 caracteres"],
			required: [true, "Número de cofres de Tesoro es requerido"]
		},
        autor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
            required: [true, "usuario is required"]
        }
	},
	{ timestamps: true }
);


PirataSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

const Pirata = mongoose.model("Pirata", PirataSchema);

module.exports = Pirata;