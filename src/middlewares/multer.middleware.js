// we will inject multer in our app to handle file uploads where ever we need
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/temp"); // we have specified the destination folder where we want to store the uploaded files and we have used uploads folder because it is a common folder name for storing uploaded files and we can change it to any other folder name if we want to store the uploaded files in a different folder and we have used cb function to pass the error and the destination folder to multer and we have passed null as the first parameter of the cb function because there is no error while specifying the destination folder and we have passed uploads/ as the second parameter of the cb function because it is the destination folder where we want to store the uploaded files.
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // we have generated a unique suffix for the file name using the current timestamp and a random number between 0 and 1e9 and we have used Date.now() method to get the current timestamp in milliseconds and we have used Math.random() method to generate a random number between 0 and 1 and we have multiplied it by 1e9 to get a random number between 0 and 1e9 and we have used Math.round() method to round the random number to the nearest integer and we have concatenated the current timestamp and the random number with a hyphen in between to get a unique suffix for the file name and we have used this unique suffix to ensure that the file name is unique and there are no conflicts with existing files in the destination folder and we want to ensure that each uploaded file has a unique name to avoid overwriting existing files in the destination folder.
        cb(null, file.originalname + "-" + uniqueSuffix); // we have specified the file name for the uploaded file and we have used the fieldname property of the file object to get the original name of the file and we have concatenated it with the unique suffix that we generated earlier to get a unique file name for the uploaded file and we have used cb function to pass the error and the file name to multer and we have passed null as the first parameter of the cb function because there is no error while specifying the file name and we have passed the unique file name as the second parameter of the cb function because it is the file name that we want to use for the uploaded file.
    },
});

 export const upload = multer({ storage }); 
 /* we have created an instance of multer and we have passed the storage configuration
  to it and we have exported the upload instance so 
  that we can use it in our routes to
   handle file uploads and we can use
    the upload instance as a middleware
     in our routes to handle file uploads and we can specify 
     the field name of the file that we want to upload in the route handler 
     and we can access the uploaded file in the route handler using 
     the req.file object and we can access the original name of the uploaded file 
     using the originalname property of the req.file object and we can access the unique file name of the uploaded file using the filename property of the req.file object and we can access the path of the uploaded 
     file using the path property of the req.file object and we can access other properties of 
     the uploaded file using other properties of the req.file object.   
     */
    

