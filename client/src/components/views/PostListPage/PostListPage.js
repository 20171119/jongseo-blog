import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { Col, Card, Row, Avatar, List } from 'antd';

const { Meta } = Card;

function PostListPage() {

    const user = useSelector(state => state.user)
    const [Posts, setPosts] = useState([])

    useEffect(() => {
        Axios.post('/api/posts/getPosts')
            .then(response => {
                console.log("getPosts");
                if (response.data.success) {
                    console.log(response.data.posts)
                    setPosts(response.data.posts)
                } else {
                    alert('Failed to fectch product datas')
                }
            })
    }, [])

    const data = [
        {
          title: 'Ant Design Title 1',
        },
        {
          title: 'Ant Design Title 2',
        },
        {
          title: 'Ant Design Title 3',
        },
        {
          title: 'Ant Design Title 4',
        },
      ];



    return (
        <div style={{ marginLeft: '288px', marginRight: '270px', marginTop: '40px' }}>
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
        </div>
    )
}

export default PostListPage