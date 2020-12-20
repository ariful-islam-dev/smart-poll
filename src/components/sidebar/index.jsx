import React, { Component } from "react";
import { Button, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import PollForm from "../poll-form";
import PollList from "./poll-list";

export class Sidebar extends Component {
  state = {
    openModal: false
  }

  toggleModal = () => {
    this.setState({
      openModal: !this.state.openModal
    })
  };
  render() {
    return (
      <div className="sideBar">
        <div className="d-flex mb-5">
          <Input
            type="search"
            placeholder="Search"
            onChange={(e) => this.props.handleChange(e.target.value)}
            value={this.props.value}
          />
          <Button color="success" className="ml-2" onClick={this.toggleModal}>
            New
          </Button>
        </div>

        <h3>List of Polls</h3>
        <hr />
        <PollList polls={this.props.polls} selectPoll={this.props.selectPoll} />
        <Modal isOpen={this.state.openModal} toggle={this.toggleModal} unmountOnClose={true}>
          <ModalHeader toggle={this.toggleModal}>
            Create A New Poll
          </ModalHeader>
          <ModalBody>
            <PollForm submit={this.props.addNewPoll} />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Sidebar;
