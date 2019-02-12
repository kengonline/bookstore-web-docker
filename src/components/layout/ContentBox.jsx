import React from 'react';
import styled from "styled-components";

const StyledBox = styled.div`
    &.content-box {
        position: relative;
        background: #fff;
    }
`

const StyledHeader = styled.div`
    &.header {
        border-bottom: 1px solid #e8e8e8;
        padding: 10px 16px;
        text-align: left;
    }
`

const Header = props => (
    <StyledHeader className="header">
        {props.children}
    </StyledHeader>
)

const StyledContent = styled.div`
    &.content {
        padding: 24px;
    }
`

const Content = props => (
    <StyledContent className="content">
        {props.children}
    </StyledContent>
)

const StyledFooter = styled.div`
    &.footer {
        border-top: 1px solid #e8e8e8;
        padding: 10px 16px;
        text-align: right;
    }
`

const Footer = props => (
    <StyledFooter className="footer">
        {props.children}
    </StyledFooter>
)

const ContentBox = ({ className, header, children, footer }) => (
    <StyledBox className={`content-box ${className}`}>
        {header && (<Header>{header}</Header>)}

        <Content>{children}</Content>

        {footer && (<Footer>{footer}</Footer>)}
    </StyledBox>
);

export default ContentBox;