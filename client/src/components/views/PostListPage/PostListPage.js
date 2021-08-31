import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { Col, Card, Row, Avatar, List } from 'antd';
import CategoryList from './Sections/CategoryList';

const { Meta } = Card;

function PostListPage() {

    const user = useSelector(state => state.user)
    const [Posts, setPosts] = useState([])
    const [Category, setCategory] = useState("");

    const variable =  {
        category: Category
    }

    useEffect(() => {
        Axios.post('/api/posts/getPosts', variable)
            .then(response => {
                console.log("getPosts");
                if (response.data.success) {
                    console.log(response.data.posts)
                    setPosts(response.data.posts)
                } else {
                    alert('Failed to fectch product datas')
                }
            })
    }, [Category])

    const updateCategory = (selectCategory) => {
        setCategory(selectCategory)
        console.log("updateCategory");
    }



    return (
        <div style={{ marginLeft: '288px', marginRight: '270px', marginTop: '20px' }}>
            <Row>
                <Col xs={24} sm={24} md={18} lg={15} >
                    {Posts && 
                        <List
                            itemLayout="horizontal"
                            pagination={{
                                onChange: page => {
                                console.log(page);
                                },
                                pageSize: 5,
                            }}
                            dataSource={Posts}
                            renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={<a href={`/posts/${item._id}`}>{item.title}</a>}
                                    description={item.content}
                                />
                                {item.content}
                            </List.Item>
                            )}
                        />
                    }
                </Col>
                <Col xs={0} sm={0} md={6} lg={9}>
                    <CategoryList refreshFunction={updateCategory}/>
                    {/* <Category/> */}
                </Col>
            </Row>
        </div>
    )
}

export default PostListPage