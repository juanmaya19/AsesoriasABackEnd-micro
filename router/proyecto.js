const { Router } = require('express');
const Proyecto = require('../models/Proyecto');
const Cliente = require('../models/Cliente');
const Etapa = require('../models/Etapa');
const Tipoproyecto = require('../models/Tipoproyecto');
const Universidad = require('../models/Universidad');

const router = Router();


router.get('/', async function (req, res) {
    try {
        const proyectos = await Proyecto.find().populate([
            {
                path: 'cliente', select: 'nombre'
            },
            {
                path: 'tipoProyecto', select: 'nombre'
            },
            {
                path: 'universidad', select: 'nombre telefono'
            },
            {
                path: 'etapa', select: 'nombre'
            },
        ]);
        res.send(proyectos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});





router.get('/:proyectoId', async function(req, res) {
    try {
        const proyecto = await Proyecto.findById(req.params.proyectoId);
        if (!proyecto) {
            return res.status(404).send('Proyecto no existe');
        }
        res.send(proyecto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar proyecto');
    }
});



module.exports = router;