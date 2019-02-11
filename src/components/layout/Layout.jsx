import React, { Component } from 'react';
import styled from "styled-components";
import { Layout } from 'antd';

// Services
import { redirect } from 'src/services/router.service';

// Components
import Sidebar from 'src/components/layout/Sidebar';
import Header from 'src/components/layout/Header';
import Footer from "src/components/layout/Footer";

const StyledLayout = styled(Layout)`
&.ant-layout {
    min-height: 100vh;
}

& .ant-layout-content {
    margin: 24px;
    padding-top: 64px;

    .page-wrapper {
        width: 100%;
        height: 100%;
        min-height: 100%;
        transition: .3s;
    }
}

& .navigator {
    margin-top: -24px;
}
`

const HeaderLayout = styled(Layout)`
    &.ant-layout {
        min-height: 100vh;
        padding-left: ${props => props.collapsed ? '80px' : '220px'}
    }
`

class CustomLayout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            defaultMenu: [props.location.pathname],
            collapsed: false
        }
    }

    onClickSidebar = (value) => {
        redirect(value.key)
    }

    onCollapseChange = (collapsed) => {
        this.setState({ collapsed })
    }

    render() {
        const { defaultMenu, collapsed } = this.state;

        return (
            <StyledLayout hasSider={true}>
                <Sidebar defaultMenu={defaultMenu} onClick={this.onClickSidebar} onCollapseChange={this.onCollapseChange} />
                <HeaderLayout collapsed={collapsed ? 1 : 0}>
                    <Header collapsed={collapsed} />
                    <Layout.Content>
                        <div className="page-wrapper">
                            {this.props.children}
                        </div>
                    </Layout.Content>
                    {/* <Footer style={{ textAlign: 'center' }}>
                        Cheetah © All Rights Reserved.
                    </Footer> */}
                </HeaderLayout>
            </StyledLayout>
        )
    }
}

export default CustomLayout;