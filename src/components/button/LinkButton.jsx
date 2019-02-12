import styled from 'styled-components';
import { Button } from "antd";

const LinkButton = styled(Button)`
    &.ant-btn {
        border: none;
        padding: 0;
        box-shadow: none;
        border-radius: unset;
        color: ${props => props.disabled ? 'rgba(0, 0, 0, 0.25)' : '#1890ff'};
        background-color: unset;

        &:hover {
            background-color: unset;
        }

        &[ant-click-animating-without-extra-node="true"]:after {
            display: none;
        }
    }
`

export default LinkButton