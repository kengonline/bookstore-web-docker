import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MomentPropTypes from 'react-moment-proptypes';
import { Menu, Dropdown, Icon } from "antd";

// Components
import BaseCard from "src/components/card/BaseCard";

const propTypes = {
    id: PropTypes.number.isRequired,
    publisherId: PropTypes.number.isRequired,
    createdBy: PropTypes.string.isRequired,
    createdDate: MomentPropTypes.momentObj.isRequired,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    url: PropTypes.string,
}

const MoreIcon = styled(Icon)`
    &.anticon {
        transform: rotate(90deg);
        font-weight: bold;
        font-size: 20px;
    }
`

const menu = (url) => (
    <Menu onClick={() => window.open(url, '_blank')}>
        <Menu.Item key={url}>
            Go to source
      </Menu.Item>
    </Menu>
);

const FeedCard = props => {
    return (
        <BaseCard
            title={props.createdBy}
            bordered={false}
            extra={(
                <Dropdown overlay={() => menu(props.url)} trigger={['click']}>
                    <MoreIcon type="ellipsis" />
                </Dropdown>
            )}
        >
            {props.children}
        </BaseCard>
    );
};

FeedCard.propTypes = propTypes;

export default FeedCard;