import React, { Component } from 'react';
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

class FeedListWithLoadMore extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetching: false
        }
    }

    onLoadMore = async () => {
        this.setState({ fetching: true });

        await this.props.onLoadMore();

        this.setState({ fetching: false });
    }

    renderFeedCards = (item) => {
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

    renderLoadMore = (disabled) => {
        return (
            <LoadMoreRow>
                <Button onClick={this.onLoadMore} disabled={disabled}>Load more</Button>
            </LoadMoreRow>
        )
    }

    mergeDataSource = (dataSource, fetching) => {
        if (fetching === false) {
            return dataSource
        }

        return [...dataSource, { loading: true }]
    }

    render() {
        const { dataSource } = this.props;
        const { fetching } = this.state;

        return (
            <List
                loadMore={this.renderLoadMore(fetching)}
                grid={{ gutter: 16, xs: 1, md: 3 }}
                dataSource={this.mergeDataSource(dataSource, fetching)}
                renderItem={this.renderFeedCards}
            />
        );
    }
}

FeedListWithLoadMore.propTypes = propTypes;
FeedListWithLoadMore.defaultProps = defaultProps;

export default FeedListWithLoadMore;