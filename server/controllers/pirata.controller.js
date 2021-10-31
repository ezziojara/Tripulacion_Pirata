const Pirata = require('../models/pirata.model');

module.exports.getAllPiratas = async (req, res) => {
    try{
        
        const piratasList = await Pirata.find();
        return res.json({ piratasList });
    }catch(err){
        return res.status(500).json({error: err});
    }
};

module.exports.getOnePirata = async (req, res) => {
    try{
        const { id } = req.params;
        const pirata = await Pirata.findById(id);
        return res.json({ pirata });

    }catch(err){
        return res.status(500).json({error: err});
    }
}

module.exports.gettPiratasxUsuario = async (req, res) => {
    try{
        const { id } = req.params;
        const piratas = await Pirata.find({ autor: id });
        return res.json({ piratas });

    }catch(err){
        return res.status(500).json({error: err});
    }
}

module.exports.createPirata = async (req, res) => {
    try{
        
        const { body } = req;
        // const grupo = body.grupoViaje;
        // const arr = grupo.split(','); 
        // body.grupoViaje = arr;
        console.log(body)
        const newPirata = await Pirata.create(body)
        console.log(newPirata)
        return res.json({ newPirata })

    }catch(err){
        return res.status(500).json({error: err});
    }
}

module.exports.UpdatePirata = async (req, res) => {
    try{
        const { id } = req.params;
        const updatePirata =  await Pirata.findByIdAndUpdate({_id: id},req.body,{new: true});
        return res.json({msg: 'Se ha actualizado correctamente', updatePirata});

    }catch(err){
        return res.status(500).json({error: err});
    }
}

module.exports.deletePirata = async (req, res) => {
    try{
        const { id } = req.params;
        const deletePirata =  await Pirata.deleteOne({_id: id});
        return res.json({msg: 'Se ha borrado pirata exitosamente', pirata: deletePirata});
    }catch(err){
        return res.status(500).json({error: err});
    }
}