import React from 'react'
import { Form, Field, withFormik } from 'formik'
import * as Yup from 'yup'
import AxiosAuth from '../../utils/AxiosAuth'

const Login = ({ errors, touched }) => {
  return (
    <div className='form-container'>
      <h1>Login!</h1>
      <Form>
        <Field
          type='text'
          name='username'
          placeholder='Username'
          autoComplete='user-name'
          className='input'
        />
        {touched.username && errors.username && <p className='error'>{errors.username}</p>}
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
  mapPropsToValues({ username, password }) {
    return {
      username: username || '',
      password: password || '',
    }
  },
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .required('Username Required'),
    password: Yup.string()
      .min(2, 'Password Too Short')
      .max(28, 'Password Too Long')
      .required(),
  }),
  handleSubmit(values, { setStatus }) {

    AxiosAuth()
      .post("https://secretrecipebw.herokuapp.com/auth/login", values)
      .then(res => {
        setStatus(res.data);
        localStorage.setItem('token', res.data.token)
        console.log("Login successful", res);
        window.location.assign('/');
      })
      .catch(error => console.log(error.response));
  }
})
const PopulatedLoginForm = FormikApp(Login)

export default PopulatedLoginForm;
