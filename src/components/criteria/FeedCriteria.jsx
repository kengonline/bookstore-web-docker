import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MomentPropTypes from 'react-moment-proptypes';
import { Row, Col } from "antd";

// Components
import PopoverDateRange from "src/components/filter/PopoverDateRange";
import TitleLabel from "src/components/form/TitleLabel";

const propTypes = {
    defaultValue: PropTypes.shape({
        dateRange: PropTypes.arrayOf(MomentPropTypes.momentObj)
    }),
    onChange: PropTypes.func
}

const defaultProps = {
    defaultValue: { dateRange: [] },
    onChange: () => { }
}

class FeedCriteria extends Component {
    constructor(props) {
        super(props);

        this.criteria = props.defaultValue
    }

    onChange = (key, value) => {
        this.criteria[key] = value;

        this.props.onChange(this.criteria);
    }

    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col xs={24} md={12}>
                        <TitleLabel title="Created Time" />
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} md={12}>
                        <PopoverDateRange
                            defaultValue={this.criteria.dateRange}
                            onChange={(value) => this.onChange('dateRange', value)}
                        />
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

FeedCriteria.propTypes = propTypes;
FeedCriteria.defaultProps = defaultProps;

export default FeedCriteria;