const express = require('express');
const response = require('../../network/response')
const controller = require('./controller')
const router = express.Router();


router.get('/', (req, res) => {
    controller.getMessages()
        .then((messageList) => {
            response.success(req, res, messageList, 200); 
        })
        .catch((error) => {
            response.error(req, res, 'Unexpected Error', 500, error, '[messageNetworkGet]');
        })
});


router.post('/', (req, res) => {
    
    controller.addMessage(req.body.user, req.body.message)
        .then((fullMessage) => {
            response.success(req, res, fullMessage, 201) 
        })
        .catch((error) => {
            response.error(req, res, 'Algo salio mal, intentalo de nuevo', 500, error, '[messageNetworkPost]') 
        })

});


router.delete('/', (req, res) => {
    res.header({
        "custom-header": "Mensaje personalizado"
    });
    response.success(req, res, "Mensaje elminado") 
});


//Exportacion de las rutas
module.exports = router;