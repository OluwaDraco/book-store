import React from "react";

export default (props)=>{
    const {
        cancel,
        submit,
        submitButtonText,
        errors,
        elements,
    }= props

   function handleSubmit(event){
    event.preventDefault();
    submit()
   }

   function handleCancel(event){
    event.preventDefault();
    cancel()
   }
    return (
        <div>
            <ErrorDisplay errors={errors} />
            {elements()}
            <form onSubmit={handleSubmit}>
            <button className="button" type="submit">{submitButtonText}</button>
            <button className="button button-secondary" onclick={handleCancel}>Cancel</button>

            </form>
        </div>


    )
}

function ErrorDisplay({errors}){
    let errorDisplay = null;

    if(errors.length){
        errorDisplay = (
            <div>
                <h2 className="validation-error-labels">Validation errors</h2>
                <div className="validation--errors">
                    <ul>
                        {errors.map((error,i)=><li key={i}>{error}</li>)}
                    </ul>
                </div>
            </div>
        )
    }

    return errorDisplay
}