import express from "express"
import User from '../models/user.js'

const router = express.Router();

//get all users
router.get('/', async(req,res)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
      }
})

//delete all users
router.get('/delete', async(req,res)=>{
    try{
        await User.deleteMany({});
        res.status(200).json({message  : "Deleted all users"})
    }
    catch (error) {
        res.status(400).json({ error: error.message });
      }
})

//delete one users
router.delete('/delete/:id', async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: `Deleted user: ${user.name}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})


router.post('/create', async (req, res)=>{
    try{
        const newUser = User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    }catch (error) {
        res.status(400).json({ error: error.message });
      }
})

// Update user by ID
router.put('/:id', async (req, res) => {
    try {
      // Find user by ID and update the fields
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  //routes for customer




export default router;
