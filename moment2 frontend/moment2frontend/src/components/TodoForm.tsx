import { useState } from "react";
import "./TodoForm.css";

const TodoForm = (props: any) => {
  // interface för formdatan
  interface FormInterface {
    title: string;
    status: string;
    description: string;
  }

  // interface för errors
  interface ErrorsInterface {
    title?: string,
    description?: string
  }
  const [formData, setFormData] = useState<FormInterface>({
    title: "",
    status: "ej påbörjad",
    description: "",
  });

  const [errors, setErrors] = useState<ErrorsInterface>({});

  // validerar formuläret
  const validateForm = (data: FormInterface) => {
    const validationErrors: ErrorsInterface = {};

    // kollar så titel finns med
    if (!data.title) {
      validationErrors.title = "Fyll i titel"
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
      updateDb(formData);
    }
  };

  // Uppdaterar todos i databasen genom api
  const updateDb = async (data: FormInterface) => {
    console.log(data)

    // fetch anrop till min backend som lägger till ny todo
    try {
      const response = await fetch("http://127.0.0.1:3000/addtodo", {
        method: "POST",
        body: JSON.stringify({
          title: data.title,
          status: data.status,
          description: data.description
        })
      })

      // kollar om anropet var lyckat
      if (!response.ok) {
        throw Error;
      } else {
        // anropar funktionen som skickas i props från TodoList
        props.update();
      }

    } catch (err) {
      console.log(err);
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
        <input type="submit" value="Lägg till" />
      </form>
    </>
  );
};

export default TodoForm;
