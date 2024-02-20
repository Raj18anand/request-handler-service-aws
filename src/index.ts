import express from "express";
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
    region: 'ap-south-1',
  credentials: {
    //@ts-ignore
    accessKeyId: 'ACCESS_KEY',
    //@ts-ignore
    secretAccessKey: 'SECRET_ACCESS_KEY',
  },
})

const app = express();
//@ts-ignore
app.get("/*", async (req, res) => {
    // id.100xdevs.com
    const host = req.hostname;

    const id = host.split(".")[0];
    const filePath = req.path;
    console.log(`dist/${id}${filePath}`);
    //dist/sdyw5/index.html
    //dist/sdyw5/index.html
    // console.log(res);
    const contents = await s3.send(new GetObjectCommand({
        Bucket: "deployitnow",
        Key: `dist/${id}${filePath}`
    }));
    // console.log(contents.Body);
    const type = filePath.endsWith("html") ? "text/html" : filePath.endsWith("css") ? "text/css" : "application/javascript"
    console.log("non",type);
    res.setHeader("Content-Type", type);
    
    res.send(contents.Body.toString());
})

app.listen(3001);
