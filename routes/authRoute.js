import  express  from "express";
import {registerController , loginController ,testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController,} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

// Routing the models 
//Register ||METHOD POST
router.post('/register',registerController);

// Login || POST
router.post('/login',loginController);

// Forgot Password
router.post("/forgot-password",forgotPasswordController) 

// test Routes
router.get('/test',requireSignIn , isAdmin, testController);

// protected route auth for user
router.get('/user-auth',requireSignIn,(req,res) => {
    res.status(200).send({ok:true});
});

// protected route auth for Admin
router.get('/admin-auth',requireSignIn,isAdmin,(req,res) => {
    res.status(200).send({ok:true});
});
// Update profile
router.put('/profile',requireSignIn,updateProfileController);

// Orders
router.get('/orders',requireSignIn,getOrdersController);

// All Orders
router.get('/all-orders',requireSignIn,isAdmin,getAllOrdersController)

// Order Status Update
router.put("/order-status/:orderId",requireSignIn,isAdmin,orderStatusController)

export default router;
