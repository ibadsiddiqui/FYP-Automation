import React from 'react';
import { Tooltip } from 'reactstrap';

export default class ToolTip extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false
    };
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {
    return (
        <Tooltip placement={this.props.position} isOpen={this.state.tooltipOpen} target={this.props.target} toggle={this.toggle}>
          {this.props.text}
        </Tooltip>
    );
  }
}