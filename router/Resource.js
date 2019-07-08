const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var app = express();
const UCC_PROTO_PATH = './Resource.proto';
var packageDefinition = protoLoader.loadSync(
    UCC_PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

const ucc = grpc.loadPackageDefinition(packageDefinition).com.mindtickle.baton.pb.batonRegistry;
var uccServiceClient = new ucc.Resources("localhost" + ":" + "80",
    grpc.credentials.createInsecure());

router.get('/',(req,res,next)=> {
    var  getRequests = {}
    // console.log("aayaa");
    try{
        uccServiceClient.ListResource(getRequests , (error, response) => {
            res.status(200).json(response);
        });
    }catch(e){}
})

var jsonParser = bodyParser.json({ type: 'application/json' } );
router.delete('/',jsonParser,(req,res,next)=> {
    var  getRequests = req.body;
    try{
        uccServiceClient.DeleteResource(getRequests , (error, response) => {
            res.status(200).json(response);
        });
    }catch(e){
    }
})


router.post('/',jsonParser,(req,res, next)=> {
    var getRequests = req.body;
    console.log("post");
    try{
        uccServiceClient.CreateResource(getRequests , (error, response) => {
            res.status(200).json(response);
        });
    }catch(e){}
})

router.put('/',jsonParser,(req,res,next)=> {
    var getRequests = req.body;
    try{
        uccServiceClient.UpdateResource(getRequests , (error, response) => {
            res.status(200).json(response);
        });
    }catch(e){}
})
module.exports = router;