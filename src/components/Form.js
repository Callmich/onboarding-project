import React, { useState, useEffect} from "react"
import { withFormik, Form, Field} from "formik";
import * as Yup from "yup";
import axios from "axios";

const FormOnBoard = ({ values, touched, errors, status })=>{
    const [person, setPerson] = useState([])
    useEffect(()=> {
        console.log("status has changed", status);
        status && setPerson(person => [...person, status]);
    }, [status])
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
                <pre>{JSON.stringify(values, null, 2)}</pre>
                {person.map(user => (
                    <ul key={user.id}>
                        <li>Name: {user.name}</li>
                        <li>Email: {user.email}</li>
                    </ul>
                ))}
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
        email: Yup.string().required().email("Must be a valid email address"),
        password: Yup.string().required().min(8, "Password must be 8 characters"),
        tos: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions')
    }),
    handleSubmit(values, {setStatus, resetForm}){
        console.log("submitting", values);
        axios.post('https://reqres.in/api/users', values).then(response => {
        console.log("success", response);
        setStatus(response.data);
        resetForm();
        })
    }
})(FormOnBoard);

export default FormikForm