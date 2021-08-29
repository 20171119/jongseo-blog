import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { Col, Card, Row, Avatar } from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import Sider from './Sections/Sider'
import CommentNum from '../DetailPostPage/Sections/CommentNum';

const { Meta } = Card;

function LandingPage() {

    const user = useSelector(state => state.user)
    const [Posts, setPosts] = useState([])

    useEffect(() => {
        Axios.post('/api/posts/getPosts', variable)
            .then(response => {
                console.log("getPosts");
                if (response.data.success) {
                    setPosts(response.data.posts)
                } else {
                    alert('Failed to fectch product datas')
                }
            })
    }, [])

    const renderCards = Posts.map((post, index) => {

        return <Col key={index}>
            <Card 
                title={<div style={{maxHeight: '30px'}}> 
                    <a href={`/users/${post.writer?._id}`} style={{color: 'black'}}>
                        <div style={{display: 'inline'}}><Avatar src={post.writer?.image}/></div> 
                        <div style={{display: 'inline', marginLeft: '10px'}}>{post.writer?.name}</div>
                    </a>
                </div>}
                style={{ marginBottom: 24 }}
                key={index}
                hoverable={true}
                // actions={[
                //     <Like post postId={post._id} userId={localStorage.getItem('userId')}></Like>,
                //     <CommentNum postId={post._id}></CommentNum>
                // ]}
                cover={<ImageSlider images={post.images} />}
            >
                <Meta
                    title={post.title}
                    description={post.content}
                />
            </Card>
        </Col>

    })


    return (
        <div style={{ marginLeft: '288px', marginRight: '270px', marginTop: '20px' }}>
            <Row>
                <Col xs={24} sm={24} md={18} lg={15} >
                    {Posts.length === 0 ?
                        <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                            <h2>No post yet...</h2>
                        </div> :
                        <div >
                            {renderCards}
                        </div>
                    }
                </Col>
                <Col xs={0} sm={0} md={6} lg={9}>
                    <Sider refreshFunction={updateSemester} userList={userList}/>
                </Col>
            </Row>
        </div>
    )
}

export default LandingPage