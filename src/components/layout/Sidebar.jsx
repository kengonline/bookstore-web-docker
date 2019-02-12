import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import { Layout, Menu, Icon } from 'antd';

// Services
import { redirect } from "src/services/router.service";

const StyledSider = styled(Layout.Sider)`
&.ant-layout-sider {
    box-shadow: 0.5px 0px 2px #E0E0E0;
    overflow: auto;
    height: 100vh;
    position: fixed;
    left: 0;
}

&.ant-layout-sider-collapsed .logo .title {
    transition: all .3s;
    margin-left: 24px;
}

& .logo {
    height: 64px;
    position: relative;
    display: flex;
    transition: all .3s;
    overflow: hidden;
    background-color: #002140;
    padding-left: 24px;

    .title {
        margin-left: 8px;
        cursor: pointer;
    }
}

& .ant-layout-sider-children label.title {
    color: #fff;
    display: inline-block;
    vertical-align: middle;
    font-size: 24px;
    line-height: 64px;
    font-family: Avenir,Helvetica Neue,Arial,Helvetica,sans-serif;
}

& .ant-btn.menu-button {
    text-align: left; 
    width: 100%; 
    border: unset;
    border-radius: unset;
    height: 48px;
    padding-top: 16px;
    padding-bottom: 16px;
    padding-left: 24px;
    box-shadow: inset -0.75px 1px 0px #E0E0E0;

    &.collapsed {
        padding-left: 32px;
        
        span {
            max-width: 0;
            display: inline-block;
            opacity: 0;
            /* transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1); */
        }
    }
}

& .group-sidebar {
    overflow-y: auto;
    height: calc(100vh - 64px);
    overflow-x: hidden;
    padding: 16px 0;
}

& .group-sidebar {
    overflow-y: auto;
    height: calc(100vh - 64px);
    overflow-x: hidden;
}

& .flip-icon {
    transform: scaleX(-1)
}
`

const LogoIcon = styled(Icon)`
    &.anticon {
        margin-top: 16px;
        font-size: 32px;
        color: white;
        cursor: pointer;
    }
`

const propTypes = {
    defaultMenu: PropTypes.arrayOf(PropTypes.string),
    onClick: PropTypes.func,
    onCollapseChange: PropTypes.func
}

const defaultProps = {
    defaultMenu: ['/dashboard'],
    onClick: () => { },
    onCollapseChange: () => { }
}

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: false,
            defaultOpenKeys: this.getDefaultOpenKeys(props.defaultMenu)
        }
    }

    onClickLogo = () => {
        redirect('/dashboard')
    }

    onToggleCollapsed = (collapsed) => {
        this.setState({ collapsed });
        this.props.onCollapseChange(collapsed);
    }

    getDefaultOpenKeys = (defaultMenus = []) => {
        if (defaultMenus.length === 0) {
            return undefined;
        }

        const pathArr = defaultMenus[0].split('/');
        if (pathArr.length === 2) {
            return undefined;
        }

        return [`/${pathArr[1]}`];
    }

    render() {
        const { defaultMenu, onClick } = this.props
        const { collapsed, defaultOpenKeys } = this.state;

        return (
            <StyledSider
                collapsible
                collapsed={collapsed}
                width={220}
                breakpoint="md"
                onBreakpoint={(value) => this.onToggleCollapsed(value)}
                onCollapse={this.onToggleCollapsed}
                theme="dark"
            >
                <div className="logo" >
                    <div>
                        <LogoIcon type="book" onClick={this.onClickLogo} />
                    </div>
                    <label className="title" onClick={this.onClickLogo}>Bookstore</label>
                </div>

                <div className="group-sidebar">
                    <Menu
                        defaultSelectedKeys={defaultMenu}
                        defaultOpenKeys={defaultOpenKeys}
                        mode="inline"
                        theme="dark"
                        inlineCollapsed={collapsed}
                        onClick={onClick}
                    >
                        <Menu.Item key="/feeds">
                            <Icon type="setting" theme="outlined" />
                            <span>Feeds</span>
                        </Menu.Item>
                        <Menu.Item key="/publisher">
                            <Icon type="setting" theme="outlined" />
                            <span>Publishers</span>
                        </Menu.Item>

                        <Menu.SubMenu
                            key="/management"
                            title={<span><Icon type="right-square" theme="outlined" /><span>Management</span></span>}
                        >
                            <Menu.Item key="/management/book">Book Management</Menu.Item>
                            <Menu.Item key="/management/publisher">Publisher Management</Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </div>
            </StyledSider>
        );
    }
}

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

export default Sidebar;