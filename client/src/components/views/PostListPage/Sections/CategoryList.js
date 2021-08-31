import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Layout, Menu, Button, Select, Divider, Input } from 'antd';
import { useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
const { Sider } = Layout;
const { Option } = Select;
const { SubMenu } = Menu;

function CategoryList(props) {

    const user = useSelector(state => state.user)
    const [OpenAdd, setOpenAdd] = useState(false)
    const [Categorys, setCategorys] = useState([])
    const [New, setNew] = useState("")

    useEffect(() => {
        getCategorys();
    }, [])

    const getCategorys = () => {
        Axios.get('/api/categorys/')
            .then(response => {
                if (response.data.success) {
                    setCategorys(response.data.categorys)
                } else {
                    alert('Failed to fectch product datas')
                }
            })
    }

    const renderCategorys = Categorys.map((category, index) => {
        return <Option key={index} value={category.category}>{category.category}</Option>
    })

    const handleCategory = (e) => {
        // var e = document.getElementById("Category-select");
        console.log("handle ", e)
        var strCategory = e;
        props.refreshFunction(strCategory);
    };

    const onNewChange = (event) => {
        setNew(event.currentTarget.value);
    };


    const onSubmit = (e) => {
        e.preventDefault();
        const variables = {
            category: New
        }
        Axios.post('/api/categorys/create', variables)
            .then(response => {
                if (response.data.success) {
                    props.refreshFunction(response.data.Category);
                    window.location.reload()
                } else {
                    alert('Failed to create Category')
                }
            })
    }

    return (
        <div>
            <Sider style={{ overflow: 'auto', position: 'fixed', height: '50%', right: 270, backgroundColor: "#fafafa" }}>
                <div>
                    <Select name="Category-select" id="Category-select" defaultValue="Category" onChange={handleCategory} style={{ width: "100%" }} dropdownRender={menu => (
                        <div>
                            {menu}
                            {user.userData?._id === '612b6c58bcb4a61b7034f13b' &&
                                <div>
                                    <Divider style={{margin: '4px 0'}} />
                                    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                        <Input style={{ flex: 'auto' }} value={New} onChange={onNewChange} />
                                        <a
                                            style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                            onClick={onSubmit}
                                        > 
                                            <PlusOutlined /> Add
                                        </a>
                                    </div>
                                </div>                                    
                            }
                        </div>
                    )}>
                        {renderCategorys}
                    </Select>
                </div>
            </Sider>
        </div>
    )
}

export default CategoryList