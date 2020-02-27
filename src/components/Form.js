import React from "react"
import { withFormik, Form, Field} from "formik";
import * as Yup from "yup";
import axios from "axios";

const FormOnBoard = ({ values, touched, errors, status })=>{

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
                    {touched.name && errors.name && (
                        <div>{errors.name}</div>
                    )}
                </label>
                <br/>
                <label htmlFor="email">Email</label>
                    <Field
                        id="email"
                        type="text"
                        name="email"
                        placeholder="name"        
                    />
                    {touched.email && errors.email && (
                        <div>{errors.email}</div>
                    )}
                <br/>
                <label htmlFor="password">Password</label>
                    <Field
                        id="password"
                        type="password"
                        name="password"
                        placeholder="password"        
                    />
                    {touched.password && errors.password && (
                        <div>{errors.password}</div>
                    )}
                <br/>
                <label htmlFor="tos">
                    Terms of Service
                    <Field 
                        id="tos"
                        type="checkbox"
                        name="tos"
                    />
                    {touched.tos && errors.tos && (
                        <div>{errors.tos}</div>
                    )}
                </label>
                <br/>
                <button type="submit">Submit</button>
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
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
        tos: Yup.string().required()
    }),
})(FormOnBoard);

export default FormikForm