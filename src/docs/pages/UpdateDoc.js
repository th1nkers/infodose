import React from 'react'
import { useParams } from 'react-router-dom'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'
import { useEffect } from 'react'
import { useState } from 'react'
import Card from '../../shared/components/UIElements/Card'

const DUMMY_DOCS = [
  {
    id: 'd1',
    title: 'IIT Delhi',
    description: 'India one of the top institution in the world.',
    imageUrl: 'https://home.iitd.ac.in/images/gallery/gallery-lg1.jpg',
    creator: 'u2'
  },
  {
    id: 'd2',
    title: 'IIT Bombay',
    description: 'India one of the top institution in the world.',
    imageUrl: 'https://www.careerindia.com/img/1200x60x675/2013/12/30-iitbombay.jpg',
    creator: 'u1'
  }
]

const UpdateDoc = () => {

  const [isLoading, setIsLoading] = useState(true);

  const docId = useParams().docId;


  const [formState, inputHandler, setFormData] = useForm({
    title: {
      value: '',
      isValid: false,
    },
    description: {
      value: '',
      isValid: false,
    },
  }, true)

  const identifiedDoc = DUMMY_DOCS.find(d => d.id === docId);

  useEffect(() => {

    if(identifiedDoc){
      setFormData({
        title: {
          value: identifiedDoc.title,
          isValid: true,
        },
        description: {
          value: identifiedDoc.description,
          isValid: true,
        },
      }, true);
  
    }
    setIsLoading(false)
  }, [setFormData, identifiedDoc])



  const docUpdateSubmitHandler = e => {
    e.preventDefault();
    console.log(formState.inputs);
  }

  if (!identifiedDoc) {
    return <Card className='center'> <h1 >Could not find doc!</h1></Card>
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>loading</h2>
      </div>
    )
  }

  return (
    !isLoading && (<form className="doc-form" onSubmit={docUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Update Doc
      </Button>
    </form>)
  )
}

export default UpdateDoc
