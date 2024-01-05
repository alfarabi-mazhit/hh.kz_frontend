import { useState, useEffect } from "react";

export default function AddEducation({ onChange, education }) {
  const onChangeData = (e) => {
    let [index, name] = e.target.name.split("-");
    index = index * 1;
    let eds = [...education];
    eds[index][name] = e.target.value;
    onChange(eds);
  };
  const newEducation = () => {
    onChange([...education, { level: "Высшее", university_name: "", faculty: "", major: "", end_date: "" }]);
  };
  const removeEd = (ed) => {
    const eds = [...education];
    const index = eds.indexOf(ed);
    eds.splice(index, 1);
    onChange(eds);
  };

  const educations = education?.map((ed, index) => (
    <div className="education" key={index}>
      <span onClick={() => removeEd(ed)}>X</span>
      <fieldset className={"fieldset fieldset-md"}>
        <label>Уровень</label>
        <select className="input" onChange={onChangeData} name={index + "-level"} value={ed.level}>
          <option value={"Высшее"}>Высшее</option>
          <option value={"Не полное высшее"}>Не полное высшее</option>
        </select>
      </fieldset>
      <fieldset className={"fieldset fieldset-md"}>
        <label>Название учебного заведения</label>
        <input className="input" onChange={onChangeData} name={index + "-university_name"} value={ed.university_name} />
      </fieldset>
      <fieldset className={"fieldset fieldset-md"}>
        <label>Факультет</label>
        <input className="input" onChange={onChangeData} name={index + "-faculty"} value={ed.faculty} />
      </fieldset>
      <fieldset className={"fieldset fieldset-md"}>
        <label>Специализация</label>
        <input className="input" onChange={onChangeData} name={index + "-major"} value={ed.major} />
      </fieldset>
      <fieldset className={"fieldset fieldset-md"}>
        <label>Год окончания</label>
        <input className="input" onChange={onChangeData} name={index + "-end_date"} value={ed.end_date} />
      </fieldset>
    </div>
  ));
  return (
    <div className="eds">
      {educations}
      <a onClick={newEducation}>{education?.length > 0 ? "Указать еще одно место обучения" : "Указать место обучения"}</a>
    </div>
  );
}
