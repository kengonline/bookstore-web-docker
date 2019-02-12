import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MomentPropTypes from 'react-moment-proptypes';
import { Menu, Dropdown, Icon } from "antd";

// Components
import BaseCard from "src/components/card/BaseCard";
import RelativeTime from "src/components/date-time/RelativeTime";

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

const StyledRelativeTime = styled(RelativeTime)`
    &.relative-time {
        font-size: 12px;
        color: #a0a0a0;
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
            title={(
                <div>
                    <div>{props.createdBy}</div>
                    <StyledRelativeTime value={props.createdDate} />
                </div>
            )}
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