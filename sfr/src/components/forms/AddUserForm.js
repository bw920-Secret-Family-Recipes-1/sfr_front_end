import React from 'react'
import { Form, Field, withFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

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
          name='userName'
          placeholder='User Name'
          autoComplete='user-name'
          className='input'
        />
        {touched.userName && errors.userName && <p className='error'>{errors.userName}</p>}
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
        <label className='term'>
          <Field type='checkbox' name='term' checked={values.term} /> I agree to
          the <a href='https://www.merriam-webster.com/dictionary/Kafkaesque'>Terms and Conditions</a>
        </label>
        <button type='submit' className='submit'>
          Submit
        </button>
      </Form>
    </div>
  )
}

const FormikApp = withFormik({
  mapPropsToValues({ firstName, lastName, userName, email, password, term }) {
    return {
      firstName: firstName || '',
      lastName: lastName || '',
      userName: userName || '',
      email: email || '',
      password: password || '',
      term: term || false
    }
  },
  validationSchema: Yup.object().shape({
    firstName: Yup.string()
      .required('Name Required'),
    lastName: Yup.string()
      .required('Name Required'),
    userName: Yup.string()
      .required('Username Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is Required'),
    password: Yup.string()
      .min(2, 'Password Too Short')
      .max(28, 'Password Too Long')
      .required(),
  }),
  handleSubmit(values, { setStatus, resetForm }) {
    axios
      .post("https://secretrecipebw.herokuapp.com/auth/register", values)
      .then(res => {
        setStatus(res.data);
        console.log(res);
        resetForm();
      })
      .catch(error => console.log(error.response));
  }
})
const PopulatedSignUpForm = FormikApp(SignUp)

export default PopulatedSignUpForm;
