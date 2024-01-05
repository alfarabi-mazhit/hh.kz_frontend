import { useState } from "react";

export default function ModalAddExp({ close, addWorkingHistory }) {
  const [start_date, setStartDate] = useState(Date.now());
  const [end_date, setEndDate] = useState(Date.now());
  const [company_name, setCompany_name] = useState("");
  const [company_description, setCompany_description] = useState("");
  const [responsibilities, setResponsibilities] = useState("");

  const onChangeMonth = (e) => {
    let date = new Date(start_date);
    date.setMonth(e.target.value);
    setStartDate(date.getTime());
  };
  const onChangeYear = (e) => {
    let date = new Date(start_date);
    date.setFullYear(e.target.value);
    setStartDate(date.getTime());
  };
  const onChangeMonthEnd = (e) => {
    let date = new Date(end_date);
    date.setMonth(e.target.value);
    setEndDate(date.getTime());
  };
  const onChangeYearEnd = (e) => {
    let date = new Date(end_date);
    date.setFullYear(e.target.value);
    setEndDate(date.getTime());
  };
  const onChangeCompanyName = (e) => {
    setCompany_name(e.target.value);
  };
  const onChangeCompanyDesc = (e) => {
    setCompany_description(e.target.value);
  };
  const onChangeResp = (e) => {
    setResponsibilities(e.target.value);
  };
  const save = () => {
    const workingHistory = {
      start_date,
      end_date,
      responsibilities,
      company_name,
      company_description,
    };
    addWorkingHistory(workingHistory);
  };
  return (
    <div className="modal">
      <div className="modal-backdrop" onClick={close}></div>
      <div className="modal-inner">
        <h2>Опыт работы</h2>
        {/* {new Date(startDate).toLocaleDateString()} */}
        {/* {new Date(endDate).toLocaleDateString()} */}
        <h4>Начало работы</h4>
        <div className="selectdate selectdate-noday">
          <select className="input" onChange={onChangeMonth} placeholder="Месяц">
            <option disabled>Выберите месяц</option>
            <option value={0}>Январь</option>
            <option value={1}>Февраль</option>
            <option value={2}>Март</option>
            <option value={3}>Апрель</option>
            <option value={4}>Май</option>
            <option value={5}>Июнь</option>
            <option value={6}>Июль</option>
            <option value={7}>Август</option>
            <option value={8}>Сентябрь</option>
            <option value={9}>Октябрь</option>
            <option value={10}>Ноябрь</option>
            <option value={11}>Декабрь</option>
          </select>
          <input className="input" placeholder="Год" type="text" onChange={onChangeYear} />
        </div>
        <h4>Конец работы</h4>
        <div className="selectdate selectdate-noday">
          <select className="input" onChange={onChangeMonthEnd} placeholder="Месяц">
            <option disabled>Выберите месяц</option>
            <option value={0}>Январь</option>
            <option value={1}>Февраль</option>
            <option value={2}>Март</option>
            <option value={3}>Апрель</option>
            <option value={4}>Май</option>
            <option value={5}>Июнь</option>
            <option value={6}>Июль</option>
            <option value={7}>Август</option>
            <option value={8}>Сентябрь</option>
            <option value={9}>Октябрь</option>
            <option value={10}>Ноябрь</option>
            <option value={11}>Декабрь</option>
          </select>
          <input className="input" placeholder="Год" type="text" onChange={onChangeYearEnd} />
        </div>
        <h4>Организация</h4>
        <input className="input" placeholder="Название компании" type="text" onChange={onChangeCompanyName} />
        <h4>Должность</h4>
        <input className="input" placeholder="Должность" type="text" onChange={onChangeCompanyDesc} />
        <h4>Обязанности на рабочем месте</h4>
        <textarea className="textarea" placeholder="Опишите что вы делали на работе" type="text" onChange={onChangeResp}></textarea>
        <div className="modal-actions">
          <button className="button button-primary-bordered" onClick={close}>
            Отменить
          </button>
          <button className="button button-primary" onClick={save}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
