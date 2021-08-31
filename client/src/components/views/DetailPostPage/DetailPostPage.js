import React, {useEffect, useState} from 'react'
import Axios from 'axios'

function DetailPostPage(props) {

    const [Post, setPost] = useState()
    const postId = props.match.params.postId;

    useEffect(() => {
        Axios.get(`/api/posts/${postId}`)
            .then(response => {
                console.log(response.data);
                setPost(response.data.post);
            })

        
    }, [])

    return (
        <div>
            {Post &&
                <div>
                    <h1>{Post.title}</h1>
                    <p>{Post.content}</p>
                </div>
            }
        </div>
    )
}

export default DetailPostPage
