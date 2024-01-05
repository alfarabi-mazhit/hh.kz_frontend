export default function Input({ label, placeholder, type, onChange, size, onBlur, value }) {
  return (
    <fieldset className={"fieldset " + size}>
      <label>{label}</label>
      <input className="input" placeholder={placeholder} type={type} onChange={onChange} onBlur={onBlur} value={value} />
    </fieldset>
  );
}
