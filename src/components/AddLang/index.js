export default function AddLang({ onChange, foreignLanguages }) {
  const remove = (index) => {
    const langs = [...foreignLanguages];
    langs.splice(index, 1);
    onChange(langs);
  };
  const onSelect = (e) => {
    const [index, key] = e.target.name.split("-");
    const langs = [...foreignLanguages];
    langs[index][key] = e.target.value;
    onChange(langs);
    onChange(langs);
  };
  const lns = foreignLanguages?.map((ln, index) => (
    <div key={index} className="lns fieldset-md selectdate selectdate-noday">
      <span
        className="remove"
        onClick={() => {
          remove(index);
        }}
      >
        X
      </span>
      <select className="input" placeholder="Язык" name={index + "-name"} value={foreignLanguages[index].name} onChange={onSelect}>
        <option disabled>Выберите язык</option>
        <option value="Казахский">Казахский</option>
        <option value="Английский">Английский</option>
        <option value="Русский">Русский</option>
      </select>
      <select className="input" placeholder="Уровень" name={index + "-level"} value={foreignLanguages[index].level} onChange={onSelect}>
        <option disabled>Выберите уровень</option>
        <option value="A1">A1 - начальный</option>
        <option value="A2">A2 - элементарный</option>
        <option value="B1">B1 - средний</option>
        <option value="B2">B2 - средне продвинутый</option>
        <option value="C1">C1 - продвинутый</option>
        <option value="C2">С2 - в совершенстве</option>
      </select>
    </div>
  ));
  return (
    <div className="eds">
      {lns}
      <a onClick={() => onChange([...foreignLanguages, { name: "Казахский", level: "A1" }])}> Добавить язык </a>
    </div>
  );
}
