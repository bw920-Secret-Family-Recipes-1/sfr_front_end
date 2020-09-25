import React from 'react'
import { Form, Field, withFormik } from 'formik'
import * as Yup from 'yup'
import AxiosAuth from '../../utils/AxiosAuth'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { TextField } from 'formik-material-ui';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: '#B85156',
    color: 'white',
  },
}));

const SignUp = ({ errors, touched, values }) => {
const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />

    <div className = {classes.paper}>
      <Typography component="h1" variant="h5">Sign Up!</Typography>

      <Form>
        <Field component={TextField}
        variant="outlined"
        margin="normal"
        fullWidth
          type='text'
          name='firstName'
          label='First Name'
          autoComplete='new-name'
          className='input'
        />
        {touched.firstName && errors.firstName && <p className='error'>{errors.firstName}</p>}
        <Field component={TextField}
        variant="outlined"
        margin="normal"
        fullWidth
          type='text'
          name='lastName'
          label='Last Name'
          autoComplete='new-name'
          className='input'
        />
        {touched.lastName && errors.lastName && <p className='error'>{errors.lastName}</p>}
        <Field component={TextField}
        variant="outlined"
        margin="normal"
        fullWidth
          type='text'
          name='username'
          label='Username'
          autoComplete='user-name'
          className='input'
        />
        {touched.username && errors.username && <p className='error'>{errors.username}</p>}
        <Field component={TextField}
        variant="outlined"
        margin="normal"
        fullWidth
          type='email'
          name='email'
          label='Email'
          className='input'
        />
        {touched.email && errors.email && (
          <p className='error'>{errors.email}</p>
        )}
        <Field component={TextField}
        variant="outlined"
        margin="normal"
        fullWidth
          type='password'
          name='password'
          autoComplete='new-password'
          label='Password'
          className='input'
        />
        {touched.password && errors.password && (
          <p className='error'>{errors.password}</p>
        )}
        <Button type='submit' fullWidth variant="contained" className={classes.submit}>
          Submit
        </Button>
      </Form>
      </div>
    </Container>
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
        window.location.assign('/user')
      })
      .catch(error => console.log(error.response));
  }
})
const PopulatedSignUpForm = FormikApp(SignUp)

export default PopulatedSignUpForm;

