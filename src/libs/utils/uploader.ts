import path from "path";
import multer from "multer";
import { v4 } from "uuid";

function getTargetImageStorage(address: any) {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./uploads/${address}`);
    },
    filename: function (req, file, cb) {
      const extension = path.parse(file.originalname).ext;
      const randomName = v4() + extension;
      cb(null, randomName);
    },
  });
}

const makeUploader = (address: string) => {
  const storage = getTargetImageStorage(address);
  return multer({ storage: storage });
};
export default makeUploader;

// const product_storage = multer.diskStorage({

//     destination: function (req, file, cb) {
//       cb(null, `./uploads/products`);
//     },
//     filename: function (req, file, cb) {
//       const extension = path.parse(file.originalname).ext;
//       const randomName = v4() + extension;
//       cb(null, randomName);
//     },
// });


// export const uploadProductImage = multer({storage: product_storage});