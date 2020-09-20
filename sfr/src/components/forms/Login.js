import React from 'react'
import { Form, Field, withFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

const Login = ({ errors, touched, values }) => {
  return (
    <div className='form-container'>
      <h1>Login!</h1>

      <Form>
        <Field
          type='text'
          name='userName'
          placeholder='User Name'
          autoComplete='user-name'
          className='input'
        />
        {touched.userName && errors.userName && <p className='error'>{errors.userName}</p>}
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
  mapPropsToValues({ userName, password }) {
    return {
      userName: userName || '',
      password: password || '',
      
    }
  },
  validationSchema: Yup.object().shape({
    userName: Yup.string()
      .required('Username Required'),
    password: Yup.string()
      .min(2, 'Password Too Short')
      .max(28, 'Password Too Long')
      .required(),
  }),
  handleSubmit(values, { setStatus, resetForm }) {
    axios
      .post("https://secretrecipebw.herokuapp.com/auth/login", values)
      .then(res => {
        setStatus(res.data);
        console.log(res);
        resetForm();
      })
      .catch(error => console.log(error.response));
  }
})
const PopulatedLoginForm = FormikApp(Login)

export default PopulatedLoginForm;
