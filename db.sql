CREATE TABLE IF NOT EXISTS clientesprueba(
   rut text primary key,
   razonsocial text not null check name <> '',
   ubicacion text not null,
   contacto integer not null
)