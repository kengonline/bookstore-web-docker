import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { List, Button } from "antd";
import moment from 'moment';
import styled from 'styled-components';

// COmponents
import BaseCard from "src/components/card/BaseCard";
import LoadingIcon from "src/components/loading/LoadingIcon";
import FeedCard from "src/components/feed/FeedCard";

const propTypes = {
    dataSource: PropTypes.array,
    onLoadMore: PropTypes.func
};

const defaultProps = {
    dataSource: [],
    onLoadMore: () => { }
}

const LoadingCard = styled(BaseCard)`
    & {
        height: 185px;

        .ant-card-body {
            height: 100%;
            display: flex;
            justify-content: center;
            flex-direction: column;
            text-align: center;
        }
    }
`

const LoadMoreRow = styled.div`
    & {
        text-align: center;
    }
`

const renderFeedCards = (item) => {
    if (item.loading) {
        return (
            <List.Item>
                <LoadingCard bordered={false}>
                    <LoadingIcon size={60} />
                </LoadingCard>
            </List.Item>
        )
    }

    return (
        <List.Item>
            <FeedCard
                id={item.id}
                publisherId={item.publisherId}
                createdBy={item.createdBy}
                createdDate={moment(item.createdDate)}
                content={item.content}
                url={item.url}
            >
                {item.content}
            </FeedCard>
        </List.Item>
    )
}

const LoadMore = ({ onClick, disabled }) => (
    <LoadMoreRow>
        <Button
            onClick={onClick}
            disabled={disabled}
        >
            Load more
        </Button>
    </LoadMoreRow>
)

const FeedListWithLoadMore = ({ dataSource, onLoadMore }) => {
    const [fetching, setFetching] = useState(false)

    const mergeDataSource = (dataSource, fetching) => {
        if (fetching === false) {
            return dataSource
        }

        return [...dataSource, { loading: true }]
    }

    const onClickLoadMore = async () => {
        setFetching(true);
        await onLoadMore();
        setFetching(false);
    }

    return (
        <List
            loadMore={<LoadMore onClick={onClickLoadMore} disabled={fetching} />}
            grid={{ gutter: 16, xs: 1, md: 3 }}
            dataSource={mergeDataSource(dataSource, fetching)}
            renderItem={renderFeedCards}
        />
    );
};

FeedListWithLoadMore.propTypes = propTypes;
FeedListWithLoadMore.defaultProps = defaultProps;

export default FeedListWithLoadMore;