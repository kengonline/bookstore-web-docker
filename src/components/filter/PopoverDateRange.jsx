import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MomentPropTypes from 'react-moment-proptypes';
import { DatePicker, Popover, Icon } from "antd";

// Components
import LinkButton from "src/components/button/LinkButton";

const propTypes = {
    value: PropTypes.arrayOf(MomentPropTypes.momentObj),
    defaultValue: PropTypes.arrayOf(MomentPropTypes.momentObj),
    trigger: PropTypes.string,
    format: PropTypes.string,
    allowClear: PropTypes.bool,
    onChange: PropTypes.func
}

const defaultProps = {
    defaultValue: [],
    format: "DD/MM/YYYY",
    trigger: "click",
    allowClear: true,
    onChange: () => { }
}

class PopoverDateRange extends Component {
    constructor(props) {
        super(props);

        this.state = {
            values: props.defaultValue
        }
    }

    onChange = (dates) => {
        this.setState({ values: dates }, this.handleChange);
    }

    renderLabel = (values = []) => {
        if (values.length === 0) {
            return "All"
        }

        return `${values[0].format("DD/MM/YYYY")} - ${values[1].format("DD/MM/YYYY")}`
    }

    handleChange = () => {
        this.props.onChange(this.state.values)
    }

    resetValue = (values = []) => {
        this.setState({ values })
    }

    render() {
        const { format, trigger, allowClear } = this.props;
        const { values } = this.state;

        return (
            <Popover
                placement="bottom"
                content={
                    <DatePicker.RangePicker
                        allowClear={allowClear}
                        format={format}
                        value={values}
                        onChange={this.onChange}
                    />
                }
                trigger={trigger}
            >
                <LinkButton>
                    {this.renderLabel(values)} <Icon type="down" />
                </LinkButton>
            </Popover>
        );
    }
}

PopoverDateRange.propTypes = propTypes;
PopoverDateRange.defaultProps = defaultProps;

export default PopoverDateRange;