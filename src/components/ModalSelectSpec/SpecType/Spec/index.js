import { useState } from "react";

export default function Spec({ spec, onChange, value }) {
  return (
    <div className="spec">
      <input type="radio" name="spec" value={spec.id} id={spec.id.toString()} onChange={onChange} checked={value === spec.id} />
      <label htmlFor={spec.id.toString()}>{spec.name}</label>
    </div>
  );
}
