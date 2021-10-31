const {getAllPiratas, getOnePirata, gettPiratasxUsuario, createPirata, UpdatePirata, deletePirata} = require('../controllers/pirata.controller');

module.exports = (app) => {
    app.get('/api/piratas',getAllPiratas);
    app.get('/api/piratas/pirata/:id',getOnePirata);
    app.get('/api/piratas/:id',gettPiratasxUsuario);
    app.post('/api/piratas/new',createPirata);
    app.put('/api/piratas/update/:id',UpdatePirata);
    app.delete('/api/piratas/delete/:id',deletePirata);
}