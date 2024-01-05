"use client";
import Header from "@/components/header";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getSpecializations } from "../store/slices/vacancySlice";
import ModalSelectSpec from "@/components/ModalSelectSpec";
export default function CreateVacancy() {
  const [name, setName] = useState("");
  const [specializationId, setSpecializationId] = useState();
  const [isSpecModalOpen, setSpecModalOpen] = useState(false);
  const dispatch = useDispatch();
  const CloseSpecModal = () => {
    setSpecModalOpen(false);
  };
  useEffect(() => {
    dispatch(getSpecializations());
  }, []);
  const handleOnSpecChange = (e) => {
    setSpecializationId(e.target.value * 1);
  };
  return (
    <main>
      <Header />
      <div className="container p7">
        <h1>Создание вакансии</h1>
        <h2>Основная информация</h2>
        <fieldset className="fieldset-vertical">
          <label htmlFor="">Название вакансии</label>
          <input
            type="text"
            className="input"
            placeholder="Введите название вакансии"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </fieldset>
        <fieldset className="fieldset-vertical">
          <label htmlFor="">Указать специализацию</label>
          <p className="link" onClick={() => setSpecModalOpen(true)}>
            Указать специализацию
          </p>
        </fieldset>
        {isSpecModalOpen && <ModalSelectSpec close={CloseSpecModal} onChange={handleOnSpecChange} value={specializationId} />}
      </div>
    </main>
  );
}
