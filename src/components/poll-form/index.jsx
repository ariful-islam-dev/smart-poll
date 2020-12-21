import React, { Component } from 'react';
import shortid from 'shortid';
import MyForm from './form';

const defaultOptions = [
    { id: shortid.generate(), value: '', vote: 0 },
    { id: shortid.generate(), value: '', vote: 0 }
]

export class PollForm extends Component {

    state = {
        title: '',
        description: '',
        options: defaultOptions,
        errors: ''
    }
    componentDidMount() {
        const { poll } = this.props
        if (poll && Object.keys(poll).length > 0) {
            this.setState({
                title: poll.title,
                description: poll.description,
                options: poll.options
            })
        }
    }
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleOptionChange = (event, index) => {
        const { options } = this.state
        options[index].value = event.target.value
        this.setState({ options })
    }

    createOption = () => {
        const { options } = this.state
        if (options.length < 5) {
            options.push({
                id: shortid.generate(),
                value: '',
                vote: 0
            })
            this.setState({ options })
        } else {
            alert('You can create Max Five Options')
        }
    }
    deleteOption = index => {
        const { options } = this.state
        if (options.length > 2) {
            options.splice(index, 1)
            this.setState({ options })
        } else {
            alert('You must have at least two options')
        }
    }
    handleSubmit = event => {
        event.preventDefault()
        const { isValid, errors } = this.validate()

        if (isValid) {
            const { title, description, options } = this.state
            const poll = {
                title,
                description,
                options
            };
            if (this.props.isUpdate) {
                poll.id = this.props.poll.id
                this.props.submit(poll)
                alert('Updated Successfully')
            } else {
                this.props.submit(poll)

                event.target.reset()
                this.setState({
                    title: '',
                    description: '',
                    options: defaultOptions,
                    errors: {}
                })
            }

        } else {
            this.setState({ errors })
        }
    }

    validate = () => {
        const errors = {}
        const { title, description, options } = this.state

        //title Validations
        if (!title) {
            errors.title = 'Please Povide A Titile'
        } else if (title.length < 20) {
            errors.title = 'Title Too Short'
        } else if (title.length > 100) {
            errors.title = 'Title Too Long'
        }

        //Description Validations
        if (!description) {
            errors.description = 'Plese Provide A Description'
        } else if (description.length > 500) {
            errors.description = 'Description is Too long'
        }

        const optionErrors = []
        options.forEach((opt, index) => {
            if (!opt.value) {
                optionErrors[index] = 'Option Text Empty'
                // optionErrors.push('Option Text Empty')
            } else if (opt.value.length > 100) {
                optionErrors[index] = 'Option Text Too Long'
            }
        })
        if (optionErrors.length > 0) {
            errors.options = optionErrors
        }

        return {
            errors,
            isValid: Object.keys(errors).length === 0
        }


    }

    render() {
        const { title, description, options, errors } = this.state
        return (
            <MyForm
                title={title}
                description={description}
                options={options}
                errors={errors}
                buttonValue={this.props.buttonValue || 'Create Poll'}
                handleChange={this.handleChange}
                handleOptionChange={this.handleOptionChange}
                createOption={this.createOption}
                deleteOption={this.deleteOption}
                handleSubmit={this.handleSubmit}
            />
        )
    }
}

export default PollForm



