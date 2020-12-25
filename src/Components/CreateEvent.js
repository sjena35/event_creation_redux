import React, { Component } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import RichTextEditor from 'react-rte';
import './CreateEvent.css'
import { connect } from 'react-redux';
import { addEvent, editEvent } from '../Event_Redux/Action';

export class CreateEvent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            checked: true,
            event: '',
            title: '',
            timezone: '',
            categories: '',
            summary: '',
            startDate: "",
            startTime: '',
            endDate: '',
            endTime: '',
            site: '',
            img: '',
            description: RichTextEditor.createEmptyValue(),



        }
    }



    imageUpload = (event) => {

        if (event.target.files) {
            const filesArr = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
            this.setState({ img: filesArr })

        }
    };

    handleChange = (event) => {
        this.setState({ checked: event.target.checked });
    };

    handler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    paragraph = (event) => {

        this.setState({ description: event })
    }


    submit = async (event) => {

        if (this.validation()) {
            event.preventDefault()

            //for adding data
            if (this.props.match.params.id == undefined) {

                const obj = { id: this.props.event_data.length + 1, event: this.state.event, title: this.state.title, categories: this.state.categories, summary: this.state.summary, site: this.state.site, checked: this.state.checked, timezone: this.state.timezone, startDate: this.state.startDate, endDate: this.state.endDate, startTime: this.state.startTime, endTime: this.state.endTime, img: this.state.img, description: this.state.description }
                this.props.addEvent(obj)

            }

            //for editing data
            else {
        
                const obj = { id: this.props.match.params.id, event: this.state.event, title: this.state.title, categories: this.state.categories, summary: this.state.summary, site: this.state.site, checked: this.state.checked, timezone: this.state.timezone, startDate: this.state.startDate, endDate: this.state.endDate, startTime: this.state.startTime, endTime: this.state.endTime, img: this.state.img, description: this.state.description }
                await this.props.editEvent(obj)
            }
            alert("Successfully submitted data")
            this.props.history.push("/viewlist")

        }


    }

    //validations required are made required at input
    validation = () => {

        if (!this.state.title.match("[a-zA-Z]{2,}")) {
            alert("Invalid Title")
            return false
        }
        else if (this.state.startDate > this.state.endDate) {
            alert("Start Date should be before end date")
            return false
        }

        else if (this.state.event == "") {
            alert("select an event")
            return false
        }
        else if (this.state.categories == "") {
            alert("select a category")
            return false
        }

        else if (this.state.summary == "") {
            alert("Summary cannot be emty")
            return false
        }

        else if (this.state.startDate == "" || this.state.endDate == "") {
            alert("Invalid Date")
            return false
        }

        else if (this.state.startTime == "" || this.state.endTime == "") {
            alert("Invalid Time")
            return false
        }

        else {
            return true
        }


    }


    cancel = () => {
        this.props.history.push('/viewlist')
    }

    componentDidMount() {
        console.log("inside compdidmount")
        if (this.props.match.params.id != undefined) {
            var arr = this.props.event_data.filter((value) => value.id == this.props.match.params.id)

            this.setState({
                checked: arr[0].checked,
                event: arr[0].event,
                title: arr[0].title,
                timezone: arr[0].timezone,
                categories: arr[0].categories,
                summary: arr[0].summary,
                startDate: arr[0].startDate,
                startTime: arr[0].startTime,
                endDate: arr[0].endDate,
                endTime: arr[0].endTime,
                site: arr[0].site,
                img: arr[0].img,
                description: arr[0].description,
            })
        }
    }

    render() {
        const { event, title, categories, summary, site, startDate, startTime, endDate, endTime, file, timezone } = this.state;

        return (
            <div>
                <form>
                    <div class="row">
                        <button class="btn btn-link">create event</button>

                        {(this.props.match.params.id == undefined) ? <button class="btn btn-primary create" type="submit" onClick={this.submit}>Create</button>
                            : <button class="btn btn-primary create" type="submit" onClick={this.submit}>Update</button>}

                        <button className="cancel" onClick={this.cancel}>Cancel</button>
                    </div>
                    <hr />
                    <div class="row">
                        <div className="col-sm-3"></div>

                        <div class="col-sm-6">

                            <div class="form-group">
                                <label>Add Event in</label><span>*</span>
                                <select name="event" value={event} onChange={this.handler} required>
                                    <option value="" disabled selected>select</option>
                                    <option value="school">School</option>
                                    <option value="college">College</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <input type="file" accept="image/png, image/jpeg" onChange={this.imageUpload} />

                            </div>

                            <div class="form-group">
                                <label>Title</label><span>*</span>
                                <input type="text" name="title" maxLength="250" value={title} onChange={this.handler} required />

                            </div>

                            <div class="form-group">
                                <label>Categories</label><span>*</span>
                                <select name="categories" value={categories} onChange={this.handler} required>
                                    <option value="" selected disabled>select</option>
                                    <option value="sports">sports</option>
                                    <option value="entertainment">entertainment</option>
                                    <option value="webinar">webinar</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label>Short Summary</label><span>*</span>
                                <textarea maxLength="500" name="summary" value={summary} onChange={this.handler} required />
                            </div>

                            <div class="form-group">
                                <label><b>Type:Public</b></label>
                                <input type="url" maxLength="1024" name="site" onChange={this.handler} value={site} />
                            </div>

                            <div class="form-group">
                                <label>Is this a virtual event?</label>
                                <FormControlLabel control={<Switch checked={this.state.checked} onChange={this.handleChange}
                                    name="checked" color="primary" />} label="Yes" labelPlacement="start" />
                                {this.state.checked ? <input type="url" placeholder="Online Link" /> : ""}
                            </div>

                            <div class="form-group">
                                <label>Select Timezone</label><span>*</span>
                                <select name="timezone" onChange={this.handler} value={timezone} className="timezone" onChange={this.handler} required>
                                    <option value="GMT-12:00">International Date Line West</option>
                                    <option value="GMT-11:00">Midway Island, Samoa</option>
                                    <option value="GMT-10:00">Hawaii</option>
                                    <option value="GMT-09:00">Alaska</option>
                                    <option value="GMT-08:00">Pacific Time (US & Canada)</option>

                                    <option value="GMT+05:00">Islamabad, Karachi, Tashkent</option>
                                    <option value="GMT+05:30">Sri Jayawardenapura</option>
                                    <option value="GMT+05:30">Chennai, Kolkata, Mumbai, New Delhi</option>
                                    <option value="GMT+07:00">Krasnoyarsk</option>
                                    <option value="GMT+08:00">Beijing, Chongqing, Hong Kong, Urumqi</option>
                                    <option value="GMT+09:00">Osaka, Sapporo, Tokyo</option>
                                    <option value="GMT+09:00">Seoul</option>
                                    <option value="GMT+09:00">Yakutsk</option>
                                    <option value="GMT+09:30">Darwin</option>
                                    <option value="GMT+10:00">Brisbane</option>
                                    <option value="GMT+10:00">Canberra, Melbourne, Sydney</option>
                                    <option value="GMT+12:00">Magadan, Solomon Is., New Caledonia</option>
                                    <option value="GMT+12:00">Auckland, Wellington</option>
                                    <option value="GMT+12:00">Fiji, Kamchatka, Marshall Is.</option>
                                    <option value="GMT+13:00">Nuku'alofa</option>
                                </select>
                                <span><b>{this.state.timezone}</b></span>
                            </div>

                            <div className="form-group">

                                <label>Start Date</label><span>*</span>
                                <label className="labeltime">Start Time</label><span>*</span>
                                <br />
                                <input type="date" className="date" value={startDate} name="startDate" onChange={this.handler} required />
                                <input type="time" className="time" value={startTime} name="startTime" onChange={this.handler} required />
                            </div>

                            <div className="form-group">
                                <label>End Date</label><span>*</span>
                                <label className="labeltime">End Time</label><span>*</span>
                                <br />
                                <input type="date" className="date" value={endDate} name="endDate" onChange={this.handler} required />
                                <input type="time" className="time" value={endTime} name="endTime" onChange={this.handler} required />
                            </div>
                            <RichTextEditor value={this.state.description} onChange={this.paragraph} />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { event_data: state.event_data }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addEvent: (event_data) => dispatch(addEvent(event_data)),
        editEvent: (event_data) => dispatch(editEvent(event_data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent)
