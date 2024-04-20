import React, { useEffect, useState } from 'react';
import { callGetImage } from '../../services/productApi';
import { Image } from 'antd';

const ContactPage = () => {
    const [image, setImage] = useState(''); // Initialize image state with an empty string
    const [listImage , setListImage] = useState([])
    useEffect(()=>{
        
       fetchListImage()
    },[])
    const fetchListImage = async()=> {
        const res =  await callGetImage()
        if(res ){
            console.log(res.data)
            setListImage(res.data)
        }else{
            console.log('lỗi')
        }
    }
    const convertBase64 = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log('check:', reader.result);
            setImage(reader.result); // Set image state with the base64 data
        };
        reader.onerror = (error) => {
            console.log(error);
        };
    };

  

    const handleUpload = () => {
        fetch('http://localhost:3003/image/uploadImage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                base64: image,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            fetchListImage()
            window.location.reload()
        })
        .catch((error) => console.log(error)); // Add a catch block to handle fetch errors
    };
  

    return (
        <div style={{ minHeight: '78vh' }}>
            Upload image <input type="file" onChange={convertBase64} />
            <br />
            <button onClick={handleUpload}>Upload Image</button>
            {image && <img src={image} alt="" style={{ width: "100px", height: 'auto' , borderRadius:'50%' }} />} 
            <h1>list image</h1>
            <div style={{display:'flex', alignItems:'flex-start' , width:'100%', gap:'10px' , flexWrap:'wrap'}}>
            {listImage.map((item , index)=>{
                return(
                
                    <Image style={{width:'200px', height:'auto'}} key={index} src={item.image} alt=""> </Image>
                )
            })}
            </div>
        </div>
    );
};

export default ContactPage;
