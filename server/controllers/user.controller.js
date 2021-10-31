const User = require('../models/user.model');



module.exports.AutenticaUsuario = async (req, res) => {
    try{
        const { body } = req;

        const usuario = await User.findOne({email: body.email});

        // console.log('pass',usuario)

        if(body.password === usuario.password){
            return res.json({ usuario });
        }
        else{
            return res.status(401).json({error: 'Contraseña incorrecta'});
        }

    }catch(err){
        return res.status(500).json({error: err});
    }
}

module.exports.createUsuario = async (req, res) => {
    try{
        
        const { body } = req;

        if(body.password === body.confirmPassword){
            
            const cuerpo = {
                first_name: body.first_name,
                last_name: body.last_name,
                email: body.email,
                password: body.password
            }
            const newUsuario = await User.create(cuerpo)
        
            return res.json({ newUsuario })
        }
        else{
            return res.status(401).json({error: 'las contraseñas deben ser identicas'});
        }

    }catch(err){

        return res.status(500).json({error: err});
    }
}