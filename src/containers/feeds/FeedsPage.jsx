import React, { Component } from 'react';
import { List, Button } from 'antd';
import moment from 'moment';
import styled from 'styled-components';

// Services
import { addRouter } from 'src/services/router.service';

// Components
import Layout from 'src/components/layout/Layout';
import FeedCard from "src/components/feed/FeedCard";
import ContentBox from "src/components/layout/ContentBox";
import LoadingScreen from "src/components/loading/LoadingScreen";
import FeedCriteria from "src/components/feed/FeedCriteria";
import BaseCard from "src/components/card/BaseCard";
import LoadingIcon from "src/components/loading/LoadingIcon";

// Mock data
import Feeds from 'src/mock-data/feeds.json'

const CriteriaBox = styled(ContentBox)`
    & {
        margin-bottom: 12px;
    }
`


class FeedsPage extends Component {
    static configRoute() {
        return {
            path: '/feeds'
        };
    }

    constructor(props) {
        super(props);

        this.criteria = {
            dateRange: [moment().startOf('day').subtract(7, 'day'), moment()]
        }

        this.state = {
            initLoading: true,
            fetching: false,
            feeds: []
        }
    }

    async componentDidMount() {
        await new Promise(reslove => setTimeout(reslove, 1000))
        this.setState({ initLoading: false, feeds: Feeds })
    }

    onCriteriaChange = (criteria) => {
        console.log(criteria)
        this.criteria = criteria;
    }

    onLoadMore = async () => {
        const { feeds } = this.state;

        this.setState({
            fetching: true,
            feeds: [...feeds, { loading: true }]
        });

        const result = await this.fetchMore(3)

        this.setState({
            fetching: false,
            feeds: [...feeds, ...result]
        })
    }

    renderFeedCards = (item) => {
        if (item.loading) {
            return (
                <List.Item>
                    <BaseCard bordered={false} style={{ textAlign: 'center', height: 185 }}>
                        <LoadingIcon size={60} style={{ paddingTop: 30, paddingBottom: 30 }} />
                    </BaseCard>
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
            <div style={{ textAlign: 'center' }}>
                <Button onClick={this.onLoadMore} disabled={disabled}>loading more</Button>
            </div>
        )
    }

    fetchMore = async (count) => {
        let list = [];

        await new Promise(reslove => setTimeout(reslove, 3000))
        for (let index = 0; index < count; index++) {
            list.push({
                id: this.state.feeds.length + index,
                publisherId: this.state.feeds.length + index,
                createdBy: `Load more ${this.state.feeds.length + index}`,
                createdDate: moment(),
                content: "หนังสือออกใหม่ประจำวันที่ 01/01/2019\n1.XXX เล่ม 1\n2.XXX เล่ม 2\n3.XXX เล่ม 3\n4.XXX เล่ม 4\n5.XXX เล่ม 5",
                source: "Facebook",
                url: "https://ant.design/components/card/"
            })
        }

        return list;
    }

    render() {
        const { initLoading, fetching, feeds } = this.state;

        if (initLoading) {
            return (
                <Layout {...this.props}>
                    <LoadingScreen />
                </Layout>
            )
        }

        return (
            <Layout {...this.props}>
                <CriteriaBox>
                    <FeedCriteria defaultValue={this.criteria} onChange={this.onCriteriaChange} />
                </CriteriaBox>

                <List
                    loadMore={this.renderLoadMore(fetching)}
                    grid={{ gutter: 16, xs: 1, md: 3 }}
                    dataSource={feeds}
                    renderItem={this.renderFeedCards}
                />
            </Layout>
        );
    }
}

export default addRouter(FeedsPage);