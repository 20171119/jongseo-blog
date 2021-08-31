import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Row, Col, Avatar } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';

function LandingPage() {

    const user = useSelector(state => state.user)

    return (
        <div style={{marginLeft:'100px' ,marginTop:'150px'}}>
            <Row>
                <Col span={8}>
                    <img
                        style={{width:'80%', height:'80%', margin: '20px auto'}} 
                        src="http://localhost:5000/uploads/unist.jpg"/>
                </Col>
                <Col span={14}>
                    <h1>박종서</h1>
                    <p>안녕하세요. 매일 성장하는 개발자 박종서입니다.</p>
                </Col>
            </Row>
        </div>
    )
}

export default LandingPage