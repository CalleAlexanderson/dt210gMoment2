import { useState } from "react";
import "./TodoForm.css";
import FormDataInterface from './Interfaces';

const UpdateForm = (props: any) => {

  // interface för errors
  interface ErrorsInterface {
    title?: string,
    description?: string
  }

  const [formData, setFormData] = useState<FormDataInterface>({
    title: "",
    status: props.status,
    description: "",
  });

  const statusArr = ["Ej påbörjad", "Pågående", "Avklarad"] 

  const [errors, setErrors] = useState<ErrorsInterface>({});

  // validerar formuläret
  const validateForm = (data: FormDataInterface) => {
    const validationErrors: ErrorsInterface = {};

    // om titel inte finns med så blir den samma som orginal
    if (!data.title) {
        data.title = props.title
    } else {
      if (data.title.length < 3) {
        validationErrors.title = "Titeln måste vara minst 3 tecken"
      }
    }

    // kollar så beskrivningen inte är längre än 200 tecken
    if (data.description.length > 200) {
      validationErrors.description = "Beskrivningen får ej vara äver 200 tecken"
    }

    return validationErrors;
  }

  const submitForm = (event: any) => {
    event?.preventDefault();
    console.log("Formuläret skickat");

    const validationErrors = validateForm(formData)

    if (Object.keys(validationErrors).length > 0) {
      // om det finns errors uppdateras staten errors 
      setErrors(validationErrors);
      console.log("errors");
    } else {
      // Tömmer errors staten
      setErrors({});
      console.log("inga errors")
      console.log(typeof formData)
      props.update(formData);
    }
  };

  return (
    <>
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="title"></label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={(event) => {
              // Uppdaterar title i formdata men behåller resten av värdena 
              setFormData({ ...formData, title: event.target.value });
            }}
          />
          {errors.title && <span>{errors.title}</span>}
        </div>
        <div>
            <select name="" id="" 
              onChange={(event) => {
                // Uppdaterar status i formdata men behåller resten av värdena 
                setFormData({ ...formData, status: event.target.value });
              }}>
                {
                    // skapar options genom en array
                    statusArr.map((stat, index) => (
                        <option key={index} value={stat}>{stat}</option>
                    ))
                }
            </select>
        </div>
        <div>
          <label htmlFor="desc"></label>
          <textarea
            name="desc"
            id="desc"
            value={formData.description}
            onChange={(event) => {
              // Uppdaterar description i formdata men behåller resten av värdena 
              setFormData({ ...formData, description: event.target.value });
            }}
          ></textarea>
          {errors.description && <span>{errors.description}</span>}
        </div>
        <input type="submit" value="Uppdatera" />
      </form>
    </>
  );
};

export default UpdateForm;
