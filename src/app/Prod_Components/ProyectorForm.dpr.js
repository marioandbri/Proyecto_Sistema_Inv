import React from 'react';

const ProyectorForm = () => {
   return (
      <div>
         <form className="form">
            <div className="field is-grouped is-grouped-multiline">
               <span className="field mr-1">
                  <label className="label">Numero de Parte</label>
                  <span className="control">
                     <input type="text" className="input" required />
                  </span>
               </span>
               <div className="field mr-1">
                  <label className="label">Marca</label>
                  <span className="control">
                     <input type="text" className="input" required />
                  </span>
               </div>
               <div className="field mr-1">
                  <label className="label">Modelo</label>
                  <span className="control">
                     <input type="text" className="input" required />
                  </span>
               </div>
            </div>
            <div className="field is-grouped is-grouped-multiline">
               <div className="field mr-1">
                  <label className="label">Lumens</label>
                  <div className="field has-addons">
                     <div className="control">
                        <input
                           required
                           name="tamañoPantalla"
                           className="input"
                           type="number"
                           // value={tamañoPantalla}
                           // onChange={(e) => {
                           //   liftProduct(e);
                           // }}
                           placeholder=""
                        />
                     </div>
                     <div className="control">
                        <a className="button is-static">Lm</a>
                     </div>
                  </div>
               </div>
               <div className="field">
                  <label htmlFor="" className="label">
                     Resolución Máxima
                  </label>
                  <div className="field has-addons mr-1">
                     <span className="control has-icons-right">
                        <input name="maxResolucionX" type="number" className="input" />
                        <span className="icon is-small is-right">
                           <i className="fas fa-arrows-alt-h"></i>
                        </span>
                     </span>
                     <span className="control">
                        <a className="button is-static">Px/Ancho</a>
                     </span>
                     <span className="control has-icons-right">
                        <input name="maxResolucionY" type="number" className="input" />
                        <span className="icon is-small is-right">
                           <i className="fas fa-arrows-alt-v"></i>
                        </span>
                     </span>
                     <span className="control">
                        <a className="button is-static">Px/Alto</a>
                     </span>
                  </div>
               </div>
            </div>
            <div className="field is-grouped is-grouped-multiline">
               <div className="field m-1">
                  <label className="label">Conexiones</label>
                  <div className="control">
                     <span className="select is-multiple">
                        <select multiple required size="4" name="entradas">
                           <option value="VGA">VGA</option>
                           <option value="DVI">DVI</option>
                           <option value="HDMI">HDMI</option>
                           <option value="DisplayPort">DisplayPort</option>
                        </select>
                     </span>
                  </div>
               </div>
            </div>
            <div className="field">
               <label className="label">Tags</label>
               <div className="control">
                  <input
                     name="tags"
                     className="input"
                     placeholder="Info Adicional filtrable. Separada por comas. Ej.: Táctil, Altavoz..."
                  />
               </div>
            </div>

            {/* ////////////// BOTONES //////////// */}
            <div className="field is-grouped mt-1">
               <div className="control">
                  <button type="submit" className="button is-link">
                     Crear
                  </button>
               </div>
               <div className="control">
                  <button type="reset" className="button is-link is-light">
                     Cancelar
                  </button>
               </div>
            </div>
         </form>
      </div>
   );
}

export default ProyectorForm;
