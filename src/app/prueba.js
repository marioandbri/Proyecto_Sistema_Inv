import React from 'react';
import { useForm } from 'react-hook-form';

export default function FormCliente() {
   const { register, handleSubmit, formState: { errors } } = useForm();
   const onSubmit = data => console.log(JSON.stringify(data));
   console.log(errors);

   return (<form onSubmit={handleSubmit(onSubmit)}>
      <div className="container is-fluid">

      <div className="field is-horizontal">
         <div className="field-label is-normal">
         <label className="label">Razón Social</label>   
         </div>
         <div className="field-body">
         <input className="input" type="text" placeholder="" {...register("razonsocial", { required: true, maxLength: 80 })} />
         </div>
      </div>
        <div className="field is-horizontal">
            <div className="field-label is-normal">
               <label className="label">R.U.T</label>   
            </div>
            <div className="field-body">
               <input className="input" type="text" placeholder="" {...register("rut", { required: true, maxLength: 10, pattern: /^(\d{5,9}-[\dkK])$/i })} />
            </div>
         </div>
         <div className="field is-horizontal">
            <div className="field-label is-normal">
               <label className="label">Ubicación</label>   
            </div>
            <div className="field-body">

         <input className="input" type="text" placeholder="" {...register("ubicacion", { required: true, maxLength: 80 })} />
         </div>
         </div>
         <div className="field is-horizontal">
            <div className="field-label is-normal">
               <label className="label">Contacto</label>   
            </div>
            <div className="field-body">
         <input className="input" type="tel" placeholder="" {...register("contacto", { required: true, maxLength: 12 })} />
         </div>
         </div>
         <div className="field is-grouped">
            <div className="control">
         <button className='button is-success' type="submit">Enviar</button>

            </div>
            <div className="control">

         <button className='button is-link' type="reset">Limpiar Campos</button>
            </div>
         </div>
      </div>

   </form>
   );
}
