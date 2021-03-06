const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [ true, 'El nombre es necessario' ]
    },
    apellido: {
        type: String,
        required: [true, 'El apellido requerido']
    },
    email: {
        type: String,
        required: [ true, 'El correo es necesario' ],
        unique: true
    },
    password: {
        type: String,
        required: [ true, 'La contraseña es necesaria' ]
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE'
    },
    //Estado del usuario Activo o Inactivo
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
    
});

module.exports = mongoose.model('Usuario', usuarioSchema);