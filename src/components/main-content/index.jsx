import React, { Component } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

import ParticipationForm from './participate-form'
import PollForm from '../poll-form'

class MainContent extends Component {
    state = {
        openModal: false
    }
    toggleModal = () => {
        this.setState({
            openModal: !this.state.openModal
        })
    }
    render() {

        if (Object.keys(this.props.poll).length === 0) {
            return (
                <div>
                    <h3>Welcome to My Application</h3>
                    <p>
                        Your can create as many poll as your want. Click the new button to create a new Poll. To chekck details of a poll plese select from the left sidebar. By selecting a poll you can check it's details, participate and check others opinion about this poll
                    </p>
                </div>
            )
        }
        const { poll, getOpinion, updatePoll, deletePoll } = this.props
        return (
            <div>
                <h3>{poll.title}</h3>
                <p>{poll.description}</p>
                <br />
                <ParticipationForm
                    poll={poll}
                    getOpinion={getOpinion}
                    toggleModal={this.toggleModal}
                    deletePoll={deletePoll}
                />
                <Modal
                    isOpen={this.state.openModal}
                    toggle={this.toggleModal}
                    unmountOnClose={true}
                >
                    <ModalHeader toggle={this.toggleModal}>
                        Update Poll
                    </ModalHeader>
                    <ModalBody>
                        <PollForm
                            poll={poll}
                            isUpdate={true}
                            submit={updatePoll}
                            buttonValue='Update Poll'
                        />
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default MainContent
