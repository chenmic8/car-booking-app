import { post } from "./dataService";

export const fileChange = (e) => {
    
    const uploadData = new FormData();

    uploadData.append("image", e.target.files[0]);

    return post('/images', uploadData)

}