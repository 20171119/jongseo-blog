import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { Col, Card, Row, Avatar } from 'antd';

const { Meta } = Card;

function LandingPage() {

    const user = useSelector(state => state.user)
    const [Posts, setPosts] = useState([])

    useEffect(() => {
        Axios.post('/api/posts/getPosts')
            .then(response => {
                console.log("getPosts");
                if (response.data.success) {
                    setPosts(response.data.posts)
                } else {
                    alert('Failed to fectch product datas')
                }
            })
    }, [])

    return (
        <div style={{ marginLeft: '288px', marginRight: '270px', marginTop: '20px' }}>
            LandingPage
        </div>
    )
}

export default LandingPage