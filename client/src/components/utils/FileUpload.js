import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import {
    PlusOutlined
} from '@ant-design/icons';
import Axios from 'axios';

function FileUpload(props) {

    const [Images, setImages] = useState([])

    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])
        //save the Image we chose inside the Node Server 
        Axios.post('/api/posts/uploadImage', formData, config)
            .then(response => {

                if (response.data.success) {
                    // console.log(response.data);
                    setImages([...Images, response.data.image])
                    props.refreshFunction([...Images, response.data.image])

                } else {
                    alert('Failed to save the Image in Server')
                }
            })
    }


    const onDelete = (image) => {
        const currentIndex = Images.indexOf(image);

        let newImages = [...Images]
        newImages.splice(currentIndex, 1)

        setImages(newImages)
        props.refreshFunction(newImages)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={800000000}
            >
                {({ getRootProps, getInputProps }) => (
                    <div style={{
                        width: '300px', height: '240px', border: '1px solid lightgray',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <PlusOutlined style={{ fontSize: '3rem', cursor: 'pointer'}} class="plusoutlined" />

                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll'}}>

                {Images && Images.map((image, index) => (
                    <div key={index} onClick={() => onDelete(image)}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`http://192.249.18.120:80/${image}`}/>
                    </div>
                ))}

                {!Images && (
                    <div>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src="error" />
                    </div>
                )}

            </div>

        </div>
    )
}

export default FileUpload