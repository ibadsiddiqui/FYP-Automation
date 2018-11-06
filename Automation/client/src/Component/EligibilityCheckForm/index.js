import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class EligibilityCheckForm extends Component {

    
    
    render() {
        return (
            <div className="container-contact100">
                <div className="wrap-contact100">
                    <form className="contact100-form validate-form">
                        <span className="contact100-form-title">
                            Eligibility Form:
				</span>
                        <span className="contact100-form-title">
                            <h6>To be completed by lead of group</h6>
                        </span>

                        <div className="wrap-input100 validate-input bg1" data-validate="Please Enter Your Program of Study">
                            <span className="label-input100">Program Name*</span>
                            <input className="input100" type="text" name="name" placeholder="Enter Your Project Title" />
                        </div>




                        <span className="StudentInfo" >
                            <h4>Student 1:</h4>

                        </span>
                        <br />

                        <div className="wrap-input100 validate-input bg1" data-validate="Enter Your Name">
                            <span className="label-input100">Enter Your Name: *</span>
                            <input className="input100" type="text" name="name" placeholder="Enter Your Name " />
                        </div>

                        <div className="wrap-input100 validate-input bg1 rs1-wrap-input100" data-validate="Enter Your CMS">
                            <span className="label-input100">CMS *</span>
                            <input className="input100" type="text" name="id" placeholder="Enter Your CMS " />
                        </div>

                        <div className="wrap-input100 validate-input bg1 rs1-wrap-input100" data-validate="Enter Your Roll No.">
                            <span className="label-input100">Roll No. *</span>
                            <input className="input100" type="text" name="Roll" placeholder="Enter Your Roll No. " />
                        </div>


                        <div className="wrap-input100 validate-input bg1 rs1-wrap-input100" data-validate="Enter Your Email (e@a.x)">
                            <span className="label-input100">Email *</span>
                            <input className="input100" type="text" name="email" placeholder="Enter Your Email " />
                        </div>

                        <div className="wrap-input100 bg1 rs1-wrap-input100">
                            <span className="label-input100">Phone</span>
                            <input className="input100" type="text" name="phone" placeholder="Enter Your Personal Contact No." />
                        </div>




                        <span className="StudentInfo" >
                            <h4>Student 2:</h4>
                        </span>


                        <div className="wrap-input100 validate-input bg1" data-validate="Enter Your Name">
                            <span className="label-input100">Enter Your Name: *</span>
                            <input className="input100" type="text" name="name" placeholder="Enter Your Name " />
                        </div>

                        <div className="wrap-input100 validate-input bg1 rs1-wrap-input100" data-validate="Enter Your CMS">
                            <span className="label-input100">CMS *</span>
                            <input className="input100" type="text" name="id" placeholder="Enter Your CMS " />
                        </div>


                        <div className="wrap-input100 validate-input bg1 rs1-wrap-input100" data-validate="Enter Your Roll No.">
                            <span className="label-input100">Roll No. *</span>
                            <input className="input100" type="text" name="Roll" placeholder="Enter Your Roll No. " />
                        </div>



                        <div className="wrap-input100 validate-input bg1 rs1-wrap-input100" data-validate="Enter Your Email (e@a.x)">
                            <span className="label-input100">Email *</span>
                            <input className="input100" type="text" name="email" placeholder="Enter Your Email " />
                        </div>

                        <div className="wrap-input100 bg1 rs1-wrap-input100">
                            <span className="label-input100">Phone</span>
                            <input className="input100" type="text" name="phone" placeholder="Enter Your Personal Contact No." />
                        </div>

                        <span className="StudentInfo" >
                            <h4>Student 3:</h4>
                        </span>


                        <div className="wrap-input100 validate-input bg1 " data-validate="Enter Your Name">
                            <span className="label-input100">Enter Your Name: *</span>
                            <input className="input100" type="text" name="name" placeholder="Enter Your Name " />
                        </div>

                        <div className="wrap-input100 validate-input bg1 rs1-wrap-input100" data-validate="Enter Your CMS">
                            <span className="label-input100">CMS *</span>
                            <input className="input100" type="text" name="id" placeholder="Enter Your CMS " />
                        </div>


                        <div className="wrap-input100 validate-input bg1 rs1-wrap-input100" data-validate="Enter Your Roll No.">
                            <span className="label-input100">Roll No. *</span>
                            <input className="input100" type="text" name="Roll" placeholder="Enter Your Roll No. " />
                        </div>



                        <div className="wrap-input100 validate-input bg1 rs1-wrap-input100" data-validate="Enter Your Email (e@a.x)">
                            <span className="label-input100">Email *</span>
                            <input className="input100" type="text" name="email" placeholder="Enter Your Email " />
                        </div>

                        <div className="wrap-input100 bg1 rs1-wrap-input100">
                            <span className="label-input100">Phone</span>
                            <input className="input100" type="text" name="phone" placeholder="Enter Your Personal Contact No." />
                        </div>



                        <div className="container-contact100-form-btn">
                            <Link className="contact100-form-btn" to="/login">
                                <span>
                                    Submit
							<i className="fa fa-long-arrow-right m-l-7" aria-hidden="true"></i>
                                </span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
