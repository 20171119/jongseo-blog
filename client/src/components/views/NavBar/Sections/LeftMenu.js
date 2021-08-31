import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="post">
        <a href="/posts">Post</a>
      </Menu.Item>
      <Menu.Item key="resume">
        <a href="/resume">Resume</a>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu