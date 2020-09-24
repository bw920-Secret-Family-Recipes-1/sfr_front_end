import React from 'react'
import { Form, Field, withFormik } from 'formik'
import * as Yup from 'yup'
import AxiosAuth from '../../utils/AxiosAuth'

const AddRecipe = ({ errors, touched, values }) => {
  return (
    <div className='form-container'>
      <h1>Edit recipe!</h1>

      <Form>
        <Field
          type='text'
          name='recipeName'
          placeholder='Recipe Name'
          autoComplete='new-name'
          className='input'
        />
        {touched.recipeName && errors.recipeName && <p className='error'>{errors.recipeName}</p>}

        <Field as="select" name="category">
          <option value="none">Choose a category</option>
          <option value="appetizer">Appetizer</option>
          <option value="entree">Entree</option>
          <option value="dessert">dessert</option>
          <option value="beverage">beverage</option>
        </Field>
        {touched.category && errors.category && <p className='error'>{errors.category}</p>}

        {/*TODO: add an button for additional ingredients */}
        <Field
          type='text'
          name='ingredientList'
          placeholder='Ingredient List'
          autoComplete='new-name'
          className='input'
        />
        {touched.ingredientList && errors.ingredientList && <p className='error'>{errors.ingredientList}</p>}
        <Field
          type='text'
          name='directions'
          placeholder='Directions'
          autoComplete='user-name'
          className='input'
        />
        {touched.directions && errors.directions && <p className='error'>{errors.directions}</p>}
        <Field
          type='text'
          name='source'
          placeholder='Source'
          className='input'
        />
        {touched.source && errors.source && (
          <p className='error'>{errors.source}</p>
        )}
        <Field
          type='text'
          name='description'
          placeholder='Description'
          className='input'
        />
        {touched.description && errors.description && (
          <p className='error'>{errors.description}</p>
        )}
        <button type='submit' className='submit'>
          Submit
        </button>
      </Form>
    </div>
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
    AxiosAuth()
    .put("https://secretrecipebw.herokuapp.com/users/:id/recipes", values)
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
