export const PermissionsTable = [
  [false, false, false, false], //Sin permisos
  [true, false, false, false], //Solo Consulta
  [true, false, false, true], //Consulta + Actualizacion
  [true, false, true, false], //Consulta + Ingreso
  [true, false, true, true], //Consulta + Ingreso + Actualizacion
  [true, true, false, false], //Consulta + Eliminacion
  [true, true, false, true], //Consulta + Eliminacion + Actualizacion
  [true, true, true, false], //Consulta + Eliminacion + Ingreso
  [true, true, true, true], //Consulta + Eliminacion + Ingreso + Actualizacion

]

export const [sinPermisos, Con, ConAct, ConIng, ConIngAct, ConEliAct, ConEliIng, ConEliIngAct] = PermissionsTable
