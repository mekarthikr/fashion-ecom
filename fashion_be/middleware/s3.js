import fs from 'fs'
import S3 from 'aws-sdk/clients/s3'

const bucketName = "fasion-fe-asset-manager"
const region = "ap-south-1"
const accessKey = "AKIAYLOE7RLKEJO2BB7W"
const secretKey = "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"

const s3 = new S3({
    region,
    accessKey,
    secretKey
})

export function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }

    return s3.upload(uploadParams).promise()
}

export function getFileStream(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream()
}