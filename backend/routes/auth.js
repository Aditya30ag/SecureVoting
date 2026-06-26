const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser.js");
const multer = require('multer');
const { minioClient, BUCKET_NAME } = require('../minioClient');
const crypto = require('crypto');

// Multer setup for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/createuser",
  [
    body("aadharNumber", "enter the valid aadharNumber").isLength({ min: 9 }),
    body("voterid", "enter the valid voterid").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      success = false;
      return res.json({ success, errors: result.array() });
    }
    try {
      let aaaa = await User.findOne({ aadharNumber: req.body.aadharNumber });
      if (aaaa) {
        return res.json({
          success: false,
          error: "please enter a unique value for aadharNumber",
        });
      }

      const salt = await bcrypt.genSaltSync(10);
      const secAadhar = await bcrypt.hash(req.body.aadharNumber, salt);

      user = await User.create({
        aadharNumber: secAadhar,
        voterid:req.body.voterid,
        isvoted: req.body.isvoted,
        otp:req.body.otp,
      });
      /*.then(res.send(req.body))
      .catch(err=>{console.log(err)
        res.json({error:"please enter a unique value for email",message:err.message})
      })*/
      console.log(req.body);
      const data = {
        user: {
          id: user.id,
        },
      };
      var token = jwt.sign(data, "shhhhh");
      success = true;
      res.json({ success, token });
      await user.save();
    } catch (error) {
      console.error(error.message);
      success = false;
      res.status(500).send(success, "some error occured");
    }
  }
);

router.post(
  "/login",
  [
    body("aadharNumber", "enter the valid aadharNumber").isLength({ min: 4 }),
    body("voterid", "enter the valid voterid").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      success = false;
      return res.status(400).json({ success, errors: result.array() });
    }

    try {
      const { aadharNumber,voterid } = req.body;
      let user = await User.findOne({ voterid:voterid });
      // let aaaa = await User.findOne({ aadharNumber: aadharNumber });
      // if (!aaaa) {
      //   success = false;
      //   return res.json({
      //     success,
      //     error: "please try to login with correct credentials",
      //   });
      // }
      
      
      if (!user) {
        success = false;
        return res.json({
          success,
          error: "please try to login with correct credentials",
        });
      }
      const aadharCompare = await bcrypt.compare(req.body.aadharNumber, user.aadharNumber);
      if (!aadharCompare) {
        success = false;
        return res.json({
          success,
          error: "please try to login with correct credentials 1",
        });
      }
      if (user.isvoted === true) {
        success = false;
        success1 = false;
        return res.status(200).json({success,success1,error: "User with this id is already voted" });
      }
      const data={
        user:{
          id:user.id
        }
       }
      var otp=user.otp;
      var token = jwt.sign(data, "shhhhh");
      success = true;
      res.json({ success, token ,otp});

    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);

router.post('/getuser',fetchuser,async(req,res)=>{

  try {
    userId=req.user.id;
    const user=await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.send(user)
  } catch (error) {
      console.error(error.message)
      res.status(500).json({ error: "some error occured" })
  }
  
})

router.put("/updateuser/:id",async (req, res) => {
  try {
    const { name, email, aadharNumber, isvoted, photoUrl } = req.body;
    const newNote = {};
    if (name) {
      newNote.name = name;
    }
    if (email) {
      newNote.email = email;
    }
    if (aadharNumber) {
      newNote.aadharNumber = aadharNumber;
    }
    if (isvoted) {
      newNote.isvoted = isvoted;
    }
    if (photoUrl) {
      newNote.photoUrl = photoUrl;
    }

    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "please use the correct credentials" });
    }

    /*if (user.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }*/

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ user });
    console.log(newNote);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "some error occured" });
  }
});

module.exports = router;

// Endpoint for uploading photo
router.post('/upload-photo', fetchuser, upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No photo uploaded' });
    }
    
    // Generate unique filename
    const ext = req.file.mimetype.split('/')[1] || 'png';
    const filename = `${req.user.id}-${crypto.randomBytes(8).toString('hex')}.${ext}`;
    
    // Upload to MinIO
    await minioClient.putObject(BUCKET_NAME, filename, req.file.buffer, req.file.size, {
      'Content-Type': req.file.mimetype
    });
    
    // Construct public URL
    const host = process.env.MINIO_ENDPOINT === 'minio' ? 'localhost' : (process.env.MINIO_ENDPOINT || '127.0.0.1');
    const port = process.env.MINIO_PORT || '9000';
    const photoUrl = `http://${host}:${port}/${BUCKET_NAME}/${filename}`;
    
    res.json({ success: true, photoUrl });
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).json({ error: 'Failed to upload photo' });
  }
});
