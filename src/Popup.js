import React from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    return (
        <div>
          <Button id="Popover1" type="button">
            Launch Popover
          </Button>
          <Popover placement="top" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
            <PopoverHeader>kake</PopoverHeader>
            <PopoverBody>Tekst om hvordan jeg kan hjelpe deg</PopoverBody>
          </Popover>
        </div>
    );
  }
}