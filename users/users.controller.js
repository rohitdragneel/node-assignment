﻿const express = require('express');
const router = express.Router();
const userService = require('./user.service');


// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.post('/logout',logout);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get("/list",getAllUser);

router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);
// router.get('/getUser',getAllUser);
module.exports = router;

function getAllUser(req,res,next){

    userService.getById(req.user.sub).then(
        (user)=>{
            if(user && user.role !=="Auditor"){
                res.status(400).json({ message: 'Only Auditor has access' })
            }
            userService.getAll()
            .then(users => res.json(users))
            .catch(err => next(err));
        }
    ).catch(err=>next(err));
}
function logout(req,res,next){
        userService.logout(req.user.sub)
        .then(user=>res.status(200).json({message:"true"}))
        .catch(err=>next(err));
}
function authenticate(req, res, next) {
    const clientIP=(req.headers['x-forwarded-for'] || '').split(',').pop().trim() || 
    req.socket.remoteAddress
    userService.authenticate(req.body,clientIP)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}