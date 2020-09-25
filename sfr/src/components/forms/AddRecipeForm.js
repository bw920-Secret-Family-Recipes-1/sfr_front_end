import React from 'react'
import { Form, Field, withFormik } from 'formik'
import * as Yup from 'yup'
import AxiosAuth from '../../utils/AxiosAuth'
import { Select } from 'formik-material-ui'
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { TextField } from 'formik-material-ui';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';

const jwt = require("jsonwebtoken");

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


const AddRecipe = ({ errors, touched, values }) => {
const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className = {classes.paper}>

      <Typography component="h1" variant="h5">Submit your recipe!</Typography>


      <Form>
        <Field component={TextField}
        variant="outlined"
        margin="normal"
        fullWidth
          type='text'
          name='recipeName'
          autoComplete='new-name'
          className='input'
          label="Recipe Name"
        />
        {touched.recipeName && errors.recipeName && <p className='error'>{errors.recipeName}</p>}

        <FormControl fullWidth>
        <InputLabel htmlFor="Category">Category</InputLabel>
        <Field         variant="outlined"
        margin="normal"
        component={Select} name="Category" as="select" name="category" label="Category">
          <Typography component="h1" variant="h5">Category</Typography>
          <MenuItem value="appetizer">Appetizer</MenuItem>
          <MenuItem value="entree">Entree</MenuItem>
          <MenuItem value="dessert">dessert</MenuItem>
          <MenuItem value="beverage">beverage</MenuItem>
        </Field>
        {touched.category && errors.category && <p className='error'>{errors.category}</p>}
        </FormControl>

        {/*TODO: add an button for additional ingredients */}
        <Field          variant="outlined"
        margin="normal"
        fullWidth
        component={TextField}
          type='text'
          name='ingredientList'
          autoComplete='new-name'
          className='input'
          label="Ingredient List"
        />
        {touched.ingredientList && errors.ingredientList && <p className='error'>{errors.ingredientList}</p>}
        <Field         variant="outlined"
        margin="normal"
        fullWidth
        component={TextField}
          type='text'
          name='directions'
          label='Directions'
          autoComplete='user-name'
          className='input'
        />
        {touched.directions && errors.directions && <p className='error'>{errors.directions}</p>}
        <Field         variant="outlined"
        margin="normal"
        fullWidth
        component={TextField}
          type='text'
          name='source'
          label='Source'
          className='input'
        />
        {touched.source && errors.source && (
          <p className='error'>{errors.source}</p>
        )}
        <Field         variant="outlined"
        margin="normal"
        fullWidth
        component={ TextField }
          type='text'
          name='description'
          label='Description'
          className='input'
        />
        {touched.description && errors.description && (
          <p className='error'>{errors.description}</p>
        )}
        <Button type='submit' fullWidth variant="contained"  className={classes.submit}>
          Submit
        </Button>
      </Form>

      </div>
    </Container>
  )
}

const FormikApp = withFormik({
  mapPropsToValues({ recipeName, category, ingredientList, directions, source, description }) {
    return {
      recipeName: recipeName || '',
      ingredientList: ingredientList || '',
      directions: directions || '',
      source: source || '',
      description: description || '',
      category: category || '',
    }
  },
  validationSchema: Yup.object().shape({
    recipeName: Yup.string()
      .required('Recipe Name Required'),
    ingredientList: Yup.string()
      .required('IngredientList Required'),
    category: Yup.string()
      .oneOf(['appetizer', 'entree', 'dessert', 'beverage']).required('please choose a category'),
  }),
  handleSubmit(values, { setStatus }) {
    console.log("Recipe added");
    let token = localStorage.getItem('token');
    token = jwt.decode(token.process.env.JWT_SECRET);
    console.log(token);
    let userid = {"user_id" : token.user_id};
    values.push(userid);
    
    AxiosAuth()
    .post("https://secretrecipebw.herokuapp.com/users/:id/recipes", values)
    .then(res => {
        setStatus(res.data);
        console.log(res);
        console.log("Recipe submitted");
        window.location.assign('/user')
      })
      .catch(error => console.log(error.response));
  }
})
const SingleRecipe = FormikApp(AddRecipe)

export default SingleRecipe;
