const express = require('express');
cors = require('cors');
const routerApi = require('./routes');
const bodyParser = require('body-parser');
const {config} = require('./config/config');

const app = express();
const port = config.apiPort;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const whiteList = [
    'http://localhost',
    'http://192.168.1.201',
    'http://192.168.1.72'
];

const options = {
    origin: (origin,callback) => {
        if(whiteList.includes(origin) || !origin){
            callback(null,true);
        }else{
            callback(new Error('no permitido'));
        }
    }
}

app.use(cors(options));

app.get('/', function(req, res){
	res.status(200).send({
		mensaje: 'Bienvenido al sistema de cobros :)'
	});
});


routerApi(app);

app.listen(port, () => {
    console.log('API escuchando en el puerto ' + port);
});