const AWS = require('aws-sdk');

exports.uploadtoAWS=(filename,data)=>{


    console.log("IN AWSS3 UPLOAD");
    
    const s3= new AWS.S3({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_KEY
    })


    console.log("AFTER 1ST AWSS3 UPLOAD");

    

    const dataToUpload={
        Bucket:process.env.AWS_BUCKET,
        Key:filename,
        Body:data,
        ACL:'public-read'
    }

    return new Promise((resolve,reject)=>{
        s3.upload(dataToUpload,(error,response)=>{
            if(error){
                console.log('/////////////////////////////////////////////////////////////////\nupload error',error);
                reject(error)
            }
            else{
                resolve(response);
            }
        })

    }) 

}