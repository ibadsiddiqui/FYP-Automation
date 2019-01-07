import React from 'react';

class MeetingMinutes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div class="container-contact100">
                <div class="wrap-contact100">
                    <form class="contact100-form validate-form">
                        <span class="contact100-form-title">
                            Meeting Minute Form:
				</span>
                        <span class="contact100-form-title">
                            <h6>To be completed by Supervisors:</h6>
                        </span>




                        <div class="wrap-input100 validate-input bg1 rs1-wrap-input100" data-validate="Enter Meeting Called By">
                            <span class="label-input100">Meeting Called By:*</span>
                            <input class="input100" type="text" name="name" placeholder=" Enter Meeting Called By: " />
                        </div>


                        <div class="wrap-input100 validate-input bg1 rs1-wrap-input100" data-validate="Enter Meeting Type">
                            <span class="label-input100">Meeting Type:*</span>
                            <input class="input100" type="text" name="name" placeholder=" Enter Meeting Type: " />
                        </div>

                        <div class="wrap-input100 validate-input bg1 rs1-wrap-input100">
                            <span class="label-input100">Number Of Attendees *</span>
                            <div>
                                <select class="js-select2" name="service">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>All were absent</option>
                                </select>
                                <div class="dropDownSelect2"></div>
                            </div>
                        </div>


                        <div class="wrap-contact100-form-range">
                            <span class="label-input100">Progress level *</span>

                            <div class="contact100-form-range-value">
                                Rate:<span id="Poor"> </span>
                                <select class="js-select2" name="service">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                    <option>All were absent</option>
                                </select>
                            </div>

                            <div class="contact100-form-range-bar">
                                <div id="filter-bar"></div>
                            </div>
                        </div>


                        <div class="wrap-input100 validate-input bg0 rs1-alert-validate" data-validate="Please Type Your Discussion Summery">
                            <span class="label-input100">Discussion Summery:</span>
                            <textarea class="input100" name="Discussion Summery" placeholder="Your Discussion Summery here..."></textarea>
                        </div>


                        <div class="wrap-input100 validate-input bg0 rs1-alert-validate" data-validate="Please Type Your Conclusion">
                            <span class="label-input100">Conclusion:</span>
                            <textarea class="input100" name="Conclusion" placeholder="Your Conclusion here..."></textarea>
                        </div>


                        <div class="wrap-input100 validate-input bg0 rs1-alert-validate" data-validate="Please Type Items of Action:">
                            <span class="label-input100">Items of Action:</span>
                            <textarea class="input100" name="Conclusion" placeholder="Your Items of Action: here..."></textarea>
                        </div>




                        <div class="wrap-input100 validate-input bg1 rs1-wrap-input100" data-validate="Enter esponsible Person">
                            <span class="label-input100">Responsible Person: *</span>
                            <input class="input100" type="text" name="text" placeholder="Enter esponsible Person " />
                        </div>

                        <div class="wrap-input100 validate-input bg1 rs1-wrap-input100" data-validate="Enter Targetted Date">
                            <span class="label-input100">Targetted Date: *</span>
                            <input class="input100" type="date" name="expected_date" placeholder="Enter Date " />
                        </div>





                        <div class="container-contact100-form-btn">
                            <button class="contact100-form-btn">
                                <span>
                                    Submit
							<i class="fa fa-long-arrow-right m-l-7" aria-hidden="true"></i>
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}


export default MeetingMinutes;
