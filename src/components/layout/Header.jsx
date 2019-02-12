import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from "styled-components";
import { Layout, Dropdown, Menu, Icon } from 'antd';

// Services
import { redirect } from "src/services/router.service";

const StyledHeaderLayout = styled(Layout.Header)`
&.ant-layout-header {
    padding: 0px;
    width: calc(100% - 220px);
    top: 0;
    right: 0;
    z-index: 9;
    transition: width .2s;
    position: fixed;
}
&.ant-layout-header.collapsed {
    width: calc(100% - 80px);
}

& .header {
    background-color: white;
    padding-right: 12px;
    height: 64px;
    line-height: 64px;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
}

& .item {
    float: right;
    height: 100%;
    overflow: hidden;
    cursor: pointer;
    transition: background-color .3s;

    &:hover {
        background: rgba(0,0,0,.025);
    }

    .ant-dropdown-link {
        font-weight: bold;
        cursor: pointer;
        padding: 0 12px;
        display: inline-block;
        height: 100%;
    }
}

& .item-badge {
    float: right;
    height: 100%;
    overflow: hidden;
    padding: 0 12px;
    transition: all .3s;
    cursor: pointer;

    &:hover {
        background: rgba(0,0,0,.025);
    }
}

& .user-icon {
    font-size: 20px;
    margin-right: 6px;
    cursor: pointer;
}
`

class Header extends Component {
    onClickUserMenu = ({ item, key, keyPath }) => {
        redirect(`/${key}`)
    }

    onClickLogout = () => {
        console.log('logout')
    }

    renderOverlay = () => {
        return (
            <Menu>
                <Menu.Item onClick={this.onClickUserMenu} key="wishlist">
                    <Icon type="setting" /> Wishlist
                </Menu.Item>
                <Menu.Item onClick={this.onClickUserMenu} key="settings">
                    <Icon type="setting" /> Settings
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout" onClick={this.onClickLogout}>
                    <Icon type="logout" /> Logout
                </Menu.Item>
            </Menu>
        )
    }

    render() {
        const { collapsed } = this.props;

        const className = collapsed ? "collapsed" : undefined;

        return (
            <StyledHeaderLayout className={className}>
                <div className="header">
                    <div className="item">
                        <Dropdown overlay={this.renderOverlay()} trigger={['click']}>
                            <span className="ant-dropdown-link" href="#">
                                <Icon type="user" theme="outlined" className="user-icon" />
                                <span>KengOnline</span>
                            </span>
                        </Dropdown>
                    </div>
                </div>
            </StyledHeaderLayout>
        );
    }
}

Header = connect(null)(Header);

export default Header;