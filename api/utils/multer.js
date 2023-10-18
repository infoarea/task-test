import multer from "multer";

//multer disk storage
// const storage = multer.diskStorage({
//     filename : (req, file, cb)=>{
//         cb(null, Date.now() + '_' + file.originalname)
//     },
//     destination : (req, file, cb)=>{
//         if (file.fieldname == "photo") {

//             cb(null, "public/product/photo")
//         }
//     }

// })

// export const categoryMulterMiddleware = multer({ storage }).single("category-photo")
// export const brandMulterMiddleware = multer({ storage }).single("brand-photo")
// export const productMulter = multer({ storage }).fields([
//     {
//         name : "product-photo",
//         maxCount : 1
//     },
//     {
//         name : "product-gallery-photo",
//         maxCount : 10
//     }
// ])

// const storage = multer.memoryStorage();

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + Math.round(Math.random() * 1000) + "_" + file.fieldname
    );
  },
});

export const brandLogo = multer({ storage }).single("logo");
export const categoryPhoto = multer({ storage }).single("catPhoto");
export const productPhoto = multer({ storage }).array("productPhoto");
export const userPhoto = multer({ storage }).single("userPhoto");
