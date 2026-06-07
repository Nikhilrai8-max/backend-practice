import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000' ,
    credentials: true

}))

// some settings for the express app to get controlled access to the request body and cookies and static files
app.use(express.json({limit: '16kb'})) 
app.use(express.urlencoded({extended: true, limit: '16kb'}))  // it is used because while searching url search engine adds some charcters in url and it exceeds the default limit of 100kb so we have to increase the limit to 16kb
app.use(express.static('public')) // it is used to serve static files like images, css files, js files etc. from the public folder. we can access these files by using the url like http://localhost:3000/images/image.png  
app.use(cookieParser()) // it is used to parse the cookies from the request and we can access the cookies by using req.cookies in the route handlers. it is also used to set the cookies in the response by using res.cookie() method. it is also used to clear the cookies in the response by using res.clearCookie() method. it is also used to sign the cookies by using res.cookie() method and we can access the signed cookies by using req.signedCookies in the route handlers. it is also used to verify the signed cookies by using req.signedCookies in the route handlers. it is also used to encrypt the cookies by using res.cookie() method and we can access the encrypted cookies by using req.cookies in the route handlers. it is also used to decrypt the cookies by using req.cookies in the route handlers. it is also used to set the options for the cookies like maxAge, httpOnly, secure, sameSite etc. by using res.cookie() method. it is also used to set the path for the cookies by using res.cookie() method. it is also used to set the domain for the cookies by using res.cookie() method. it is also used to set the expires for the cookies by using res.cookie() method. it is also used to set the signed option for the cookies by using res.cookie() method. it is also used to set the encrypt option for the cookies by using res.cookie() method.



// routes
import userRoutes from './routes/user.routes.js';


// routes declaration
app.use("/api/v1/users", userRoutes) 
// global error handler
app.use((err, req, res, next) => {
    console.error(err);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ status: 'error', message });
});
export default app;