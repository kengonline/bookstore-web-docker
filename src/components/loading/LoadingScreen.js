import React, { Component } from 'react';
import styled from "styled-components";

// Components
import LoadingIcon from 'src/components/shared/loading/LoadingIcon';

const StyledDiv = styled.div`
    & {
        height: calc(100vh - 64px);
        text-align: center;
        padding-top: calc(35vh);
    }
`

class LoadingScreen extends Component {
    render() {
        return (
            <StyledDiv>
                <LoadingIcon size={120} />
            </StyledDiv>
        );
    }
}

export default LoadingScreen;