import React from "react"
import { withFormik, Form, Field} from "formik";
import * as Yup from "yup";
import axios from "axios";

const FormOnBoard = ({ values })=>{

    return (
        <div>
            <Form>
                <label htmlFor="name">
                    Name
                    <Field 
                        id="name"
                        type="text"
                        name="name"
                        placeholder="name"
                    />
                </label>
                <label htmlFor="email">Email</label>
                    <Field
                        id="email"
                        type="text"
                        name="email"
                        placeholder="name"        
                    />
                <label htmlFor="password">Password</label>
                    <Field
                        id="password"
                        type="password"
                        name="password"
                        placeholder="password"        
                    />
                <label htmlFor="tos">
                    Terms of Service
                    <Field 
                        id="tos"
                        type="checkbox"
                        name="tos"
                        
                    />
                </label>
            </Form>
        </div>
    )
}

const FormikForm = withFormik({
    mapPropsToValues({ name, email, password, tos }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || false
        }
    }
})(FormOnBoard);

export default FormikForm