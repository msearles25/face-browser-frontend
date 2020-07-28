import axios from 'axios';

export  const imageUpload = async imgInfo => {
    if(!imgInfo.imgFile) {
        return `${process.env.REACT_APP_DEFAULT_IMAGE}`;
    }

    const imageData = new FormData();
    const image = imgInfo.imgFile[0]
    imageData.append('upload_preset', `${process.env.REACT_APP_USER_IMAGE_PRESET}`)
    imageData.append('file', image);
    try {
        const imageUrl = await axios.post(`${process.env.REACT_APP_IMAGE_UPLOAD_URL}`, imageData)
        return await imageUrl.data.secure_url;
    }
    catch(error) {
        console.log(error.response)
        return `${process.env.REACT_APP_DEFAULT_IMAGE}`;
    }
}