import React from 'react'
import { Form, Field, withFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import AxiosAuth from '../../utils/AxiosAuth'

const SignUp = ({ errors, touched, values }) => {
  return (
    <div className='form-container'>
      <h1>Sign Up!</h1>

      <Form>
        <Field
          type='text'
          name='firstName'
          placeholder='First Name'
          autoComplete='new-name'
          className='input'
        />
        {touched.firstName && errors.firstName && <p className='error'>{errors.firstName}</p>}
        <Field
          type='text'
          name='lastName'
          placeholder='Last Name'
          autoComplete='new-name'
          className='input'
        />
        {touched.lastName && errors.lastName && <p className='error'>{errors.lastName}</p>}
        <Field
          type='text'
          name='username'
          placeholder='Username'
          autoComplete='user-name'
          className='input'
        />
        {touched.username && errors.username && <p className='error'>{errors.username}</p>}
        <Field
          type='email'
          name='email'
          placeholder='Email'
          className='input'
        />
        {touched.email && errors.email && (
          <p className='error'>{errors.email}</p>
        )}
        <Field
          type='password'
          name='password'
          autoComplete='new-password'
          placeholder='Password'
          className='input'
        />
        {touched.password && errors.password && (
          <p className='error'>{errors.password}</p>
        )}
        <button type='submit' className='submit'>
          Submit
        </button>
      </Form>
    </div>
  )
}


const FormikApp = withFormik({
  mapPropsToValues({ firstName, lastName, username, email, password }) {
    return {
      firstName: firstName || '',
      lastName: lastName || '',
      username: username || '',
      email: email || '',
      password: password || '',
    }
  },
  validationSchema: Yup.object().shape({
    firstName: Yup.string()
      .required('Name Required'),
    lastName: Yup.string()
      .required('Name Required'),
    username: Yup.string()
      .required('username Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is Required'),
    password: Yup.string()
      .min(2, 'Password Too Short')
      .max(28, 'Password Too Long')
      .required(),
  }),

  handleSubmit(values, { setStatus }){
    console.log("User submitted");
    AxiosAuth()
      .post("https://secretrecipebw.herokuapp.com/auth/register", values)
      .then(res => {
        setStatus(res.data);
        console.log(res);
        console.log("User submitted");
        React.history.push('/Home');
      })
      .catch(error => console.log(error.response));
  }
})
const PopulatedSignUpForm = FormikApp(SignUp)

export default PopulatedSignUpForm;
