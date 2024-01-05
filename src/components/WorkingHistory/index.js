const monthsInRussian = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
export default function WorkingHistory({ workingHistory, remove }) {
  const start_date = new Date(workingHistory.start_date);
  const end_date = new Date(workingHistory.end_date);
  return (
    <div className="working-history">
      <span>
        {monthsInRussian[start_date.getMonth()]} {start_date.getUTCFullYear()} - {monthsInRussian[end_date.getMonth()]} {end_date.getUTCFullYear()}
      </span>
      <h4>{workingHistory.company_name}</h4>
      <p>{workingHistory.company_description}</p>
      <span onClick={() => remove(workingHistory)}>удалить</span>
    </div>
  );
}
