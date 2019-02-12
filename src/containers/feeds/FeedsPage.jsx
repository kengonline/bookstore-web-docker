import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';

// Services
import { addRouter } from 'src/services/router.service';

// Components
import Layout from 'src/components/layout/Layout';
import ContentBox from "src/components/layout/ContentBox";
import LoadingScreen from "src/components/loading/LoadingScreen";
import FeedCriteria from "src/components/feed/FeedCriteria";
import FeedListWithLoadMore from "src/components/feed/FeedListWithLoadMore";

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
            fetchingFeeds: true,
            feeds: []
        }
    }

    async componentDidMount() {
        await new Promise(reslove => setTimeout(reslove, 1000))
        this.setState({ fetchingFeeds: false, feeds: Feeds })
    }

    onCriteriaChange = (criteria) => {
        console.log(criteria)
        this.criteria = criteria;
    }

    onLoadMore = async () => {
        const result = await this.fetchMore(3)

        this.setState({ feeds: [...this.state.feeds, ...result] });
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
        const { fetchingFeeds, feeds } = this.state;

        if (fetchingFeeds) {
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

                <FeedListWithLoadMore
                    onLoadMore={this.onLoadMore}
                    dataSource={feeds}
                />
            </Layout>
        );
    }
}

export default addRouter(FeedsPage);