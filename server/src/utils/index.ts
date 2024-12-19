import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
export default cloudinary
// export const uploadImage = async(image: any) =>{
//     try {
//         const upload = cloudinary.uploader.upload(image, {folder: "collage-leave-application"}, (error, result) => {
//             if(error){
//                 console.log(error)
//             }
//             return result
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }