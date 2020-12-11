const express = require('express');
const _ = require('underscore');
const app = express();
const Categoria = require('../models/categoria');

app.get('/categoria', function(req, res) {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 0;

    Categoria.find({})
    .skip(Number(desde))
    .limit(Number(hasta))
    .populate('usuario', 'nombre email')
    .exec((err, categorias) => {
        if(err){
        return res.status(400).json({
            ok: false,
            msg: 'Ocurrio un error al listar las categorias',
            err
        });
        }

        res.json({
            ok:true,
            msg: 'Categorias listadas con exito',
            conteo: categorias.length,
            categorias
        });
    });
});

app.post('/categoria',(req, res) =>{
    let cat = new Categoria({
        descripcion: req.body.descripcion,
        usuario: req.body.usuario
    });
    cat.save((err, catDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'Error al insertar una categoría',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Categoria insertada con éxito',
            catDB
        })
    });
});

app.put('/categoria/:id', (req, res)=>{
    let id = req.params.id;
    let body = _.pick(req.body, ['descripcion', 'usuario']);

    Categoria.findByIdAndUpdate(id, body, 
        {new:true, runValidators:true, context:'query'}, (err, catDB)=>{
            if(err){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al momento de actualizar',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'La categoría fue actualizada con éxito',
                catDB
            });
    }); 
});
app.delete('/categoria/:id', function(req, res) {
    let id = req.params.id;

    Categoria.deleteOne({_id: id}, (err, categoriaEliminada) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                msg:'Ocurrio un errror al momento de eliminar',
                err
            });
        }

        res.json({
            ok:true,
            msg:'Categiría fue eliminada con éxito',
            categoriaEliminada
        })
    }); 
});

module.exports = app;