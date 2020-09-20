import React from 'react'
import { Form, Field, withFormik } from 'formik'
import * as Yup from 'yup'

const AddRecipe = ({ errors, touched, values }) => {
  return (
    <div className='form-container'>
      <h1>Submit your recipe!</h1>

      <Form>
        <Field
          type='text'
          name='recipeName'
          placeholder='Recipe Name'
          autoComplete='new-name'
          className='input'
        />
        {touched.recipeName && errors.recipeName && <p className='error'>{errors.recipeName}</p>}

        {/* TODO add category */}
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
  mapPropsToValues({ recipeName, ingredientList, directions, source, description}) {
    return {
      recipeName: recipeName || '',
      ingredientList: ingredientList || '',
      directions: directions || '',
      source: source || '',
      description: description || '',
    }
  },
  validationSchema: Yup.object().shape({
    recipeName: Yup.string()
      .required('Recipe Name Required'),
      ingredientList: Yup.string()
      .required('IngredientList Required'),
  }),
  handleSubmit(values, { resetForm }) {
    console.log(values)
    resetForm()
  }
})
const SingleRecipe = FormikApp(AddRecipe)

export default SingleRecipe;