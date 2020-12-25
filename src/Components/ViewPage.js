import { MDBBtn } from 'mdbreact'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addEvent } from '../Event_Redux/Action'
import './CreateEvent.css'

export class ViewPage extends Component {
    constructor(props) {
        super(props)
    }


    edit = (edit_data) => {
        this.props.history.push(`/edit/${edit_data.id}`)
    }


    add = () => {
        this.props.history.push('/')
    }


    render() {
    
        return (
            <div>


                <MDBBtn color="primary" onClick={this.add} className="add">Create Event</MDBBtn>

                <table class="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>SNo</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Edit</th>

                        </tr>
                    </thead>

                    <tbody>
                        {this.props.event_data.map((data) => (
                            <tr>
                                <td>{data.id}</td>
                                <td>{data.title}</td>
                                <td>{data.event}-{data.categories}</td>
                                <td>{data.startDate},{data.startTime}</td>
                                <td>{data.endDate},{data.endTime}</td>
                                <td><button className="btn btn-outline-success" onClick={() => this.edit(data)}>Edit</button></td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { event_data: state.event_data }
}

const mapDispatchToProps = (dispatch) => {
    return { addEvent: (event_data) => dispatch(addEvent(event_data)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPage)
