import express from 'express'
import fs from 'fs'

const app = express();

// Write file
app.get("/write-file", (req,res) => {
    fs.writeFile("./public/output.txt", "This is test message.", (err)=>{
        if(err){
            return res.status(500).send('Failed to write File');
        }
    })
    res.send("File written succesfully.");
});

// Read file

app.get("/read-file", (req, res) => {
    fs.readFile("./public/output.txt", (err, data) => {
        if (err) {
            return res.status(500).send("File Not Found");
        }
        res.setHeader('Content-Type', 'text/plain');
        res.send(data);
    });
});

// Append file
app.get("/append-file", (req,res) => {
    fs.appendFile("./public/output.txt", "\nNew text appended.", (err) => {
        if (err) {
            return res.status(500).send("File Not Found");
        }
        res.send("Content added");
    });
});


// Delete file
app.get("/delete-file", (req,res) => {
    fs.unlink("./public/output.txt", (err) => {
        if (err) {
            return res.status(500).send("File Not Found");
        }
        res.send("File deleted!");
    });
});

// Read a Folder / directory
app.get('/read-folder', (req,res)=>{
    fs.readdir('./public', (err,files)=>{
        if(err){
            console.log(err);
            return;
        }

        console.log(files);
        res.send("File readed!");
    })
})

// File Rename
app.get("/rename-file", (req,res) => {
    fs.rename('./public/output.txt', "./public/new-output.txt", (err)=>{
        if(err){
            return res.status(500).send('Failed to reanme file');
        }
        res.send("File rename succesfully!");
    })
});

// stream Data
app.get("/stream-text", (req,res)=>{
    const fileStream = fs.createReadStream('./public/new-output.txt');

    fileStream.on('open',()=>{
        fileStream.pipe(res);
    })

    fileStream.on('error',()=>{
        return res.status(500).send('Failed read stream');
    })
})

//create Folder
app.get('/create-folder', (req,res) => {
    fs.mkdir('./public/myFolder', (err)=>{
        if(err){
            return res.status(500).send("Error creating Folder");
        }

        res.send("Folder created successfullt!");
    })
})

// rename Folder
app.get('/rename-folder', (req,res) => {
    fs.rename('./public/myFolder', "./public/renameFolder", (err)=>{
        if(err){
            return res.status(500).send("Error Renamed Folder", err);
        }

        res.send("Folder renamed successfullt!");
    })
})

// Delete Folder
app.get('/delete-folder', (req,res) => {
    fs.rmdir("./public/renameFolder", (err)=>{
        if(err){
            return res.status(500).send("Error deleting Folder", err);
        }

        res.send("Folder deleted successfullt!");
    })
})

// pdf File
app.get('/read-pdf', (req,res) => {
    fs.readFile("./public/MongoDB.pdf", (err, data)=>{
        if(err){
            return res.status(500).send("pdf not found", err);
        }
        res.setHeader('Content-Type', 'application/pdf');
        res.send(data);
    })
})

// read json
app.get("/read-json", (req, res) => {
    fs.readFile("./public/data.json", (err, data) => {
        if (err) {
            return res.status(500).send("Json File Not Found");
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

// write json File
app.get("/write-json", (req, res) => {
    const newdata = { fist_name: "Akshay", last_name: "jadav", age: 27, stack: "MEAN"};
    fs.writeFile("./public/data.json", JSON.stringify(newdata) , (err) => {
        if (err) {
            return res.status(500).send("Json File Not Found");
        }
       res.send('Json File written successfully!');
    });
}); 

// write json file and keep existing json data
app.get('/append-json', (req, res) => {
    const newdata = { first_name: "Ashish", last_name: "Jadav", age: 20, stack: "PHP" };

    fs.readFile('./public/data.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send("Failed to read json file");
        }

        let jsonData;
        try {
            jsonData = JSON.parse(data);
        } catch (e) {
            jsonData = [];
        }

        if (!Array.isArray(jsonData)) {
            jsonData = [jsonData];
        }

        jsonData.push(newdata);

        fs.writeFile("./public/data.json", JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Failed to write JSON file");
            }
            res.send('JSON file updated successfully!');
        });
    });
});


// read image file
app.get("/read-image", (req, res) => {
    fs.readFile("./public/hero_img.png", (err, data) => {
        if (err) {
            return res.status(500).send("Image Not Found");
        }
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(data);
    });
});

//read video file
app.get("/read-video", (req,res) => {
    fs.readFile("./public/river.mp4", (err, data) => {
        if (err) {
            return res.status(500).send("Video Not Found");
        }
        res.setHeader('Content-Type', 'video/mp4');
        res.send(data);
    });
});

// Getting information for a file
app.get('/file-info', (req, res) => {
   fs.stat('./public/river.mp4', (err, stats) =>{
      if(err){
        return res.status(500).send("File not found.", err)
      }
      
      res.send(stats.size + 'bytes')
      console.log("File : " + stats.isFile())
      console.log("Folder : " + stats.isDirectory())
  })
}); 

// check if file exists
app.get('/file-exists', (req, res) => {
  fs.access('./public/river.mp4', (err) =>{
      if(err){
        res.send("File does not exist")
      }
      
      res.send("File Exists")
  })
});
app.listen(3000, ()=>{
    console.log("server running on port 3000");
});