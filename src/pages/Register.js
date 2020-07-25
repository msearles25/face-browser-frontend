import React, { useState } from 'react'

const Register = () => {
    const [imgSrc, setImgSrc] = useState();
    const [prevImg, setPrevImg] = useState();

    const handleImageUpload = e => {
        if(e.target.files.length === 0) {
            e.target.files = prevImg;
            return;
        }
        if(e.target.files) {
            const file = e.target.files
            setPrevImg(file)
        }

        const imgUrl = URL.createObjectURL(e.target.files[0]);
        setImgSrc(imgUrl);
    }

    return (
        <div>
            <form>
                <input type='file' onChange={handleImageUpload}/>

            </form>
            {imgSrc && <img src={imgSrc} alt='user'/> }
        </div>
    )
}

export default Register;
