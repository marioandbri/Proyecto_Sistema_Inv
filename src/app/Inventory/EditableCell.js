import React from "react";
import { useDispatch, useInventory } from "./InventoryProvider";
import { type } from "./InventoryReducer";

const EditableCell = ({
  value,
  row: { index },
  column: { id },
  updateData,
}) => {
  const state = useInventory();

  const [readMore, setReadMore] = React.useState(false);
  // const [value, setValue] = React.useState(initialValue);

  const onChange = (e) => {
    // setValue(e.target.value);
    updateData(index, id, e.target.value);
  };
  if (id == "proveedor" || id == "poseedor" || id == "numeroSerie") {
    return <span>{value}</span>;
  } else if (id == "descripcion") {
    return (
      <span>
        {!readMore ? value?.substring(0, 70) : value}
        <a
          onClick={() => {
            setReadMore(!readMore);
          }}
        >
          {!readMore ? "...Ver más" : ". Ver menos"}
        </a>
      </span>
    );
  } else if (state.editingRows.includes(index)) {
    return (
      <input className="input is-size-7" onChange={onChange} value={value} />
    );
  } else {
    return <span>{value}</span>;
  }
};

export default EditableCell;
