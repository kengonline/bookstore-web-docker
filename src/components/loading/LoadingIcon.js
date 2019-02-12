import React from 'react';
import { Icon } from 'antd'
import styled from "styled-components";

const StyledIcon = styled(Icon)`
    &.anticon.anticon-loading {
        color: #007fff;
        font-size: ${({ size }) => size === undefined ? undefined : `${size}px`}
    }
`

const LoadingIcon = props => <StyledIcon type="loading" {...props} />

export default LoadingIcon;