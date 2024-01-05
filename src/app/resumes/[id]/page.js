"use client";
import Header from "@/components/header";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { getResumeById } from "@/app/store/slices/resumeSlice";

export default function ResumePage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const resume = useSelector((state) => state.resume.resume);
  const didMount = () => {
    dispatch(getResumeById(id));
  };
  useEffect(didMount, []);
  const birthday = new Date(resume.birthday);
  let age = new Date().getTime() - birthday.getTime();
  age = parseInt(age / (1000 * 60 * 60 * 24 * 365));

  const showPhone = (phone) => {
    let res = "";
    if (phone[0] === "8") {
      phone = "+7" + phone.slice(1, phone.length);
    }
    res = `${phone.slice(0, 2)} ${phone.slice(2, 5)} ${phone.slice(5, 8)}-${phone.slice(8, 10)}-${phone.slice(10, 12)}`;
  };
  return (
    <main>
      <Header />
      <div className="container ptb7">
        <div className="flex flex-ai-c flex-jc-sb">
          <Link className="link" href={"/resumes"}>
            К списку резюме
          </Link>
          <Link className="button button-secondary-bordered" href={`/edit-resume/${resume.id}`}>
            Редактировать резюме
          </Link>
        </div>
        <h1>
          {resume.first_name} {resume.last_name}
        </h1>
        <p>
          {resume.gender} {age} лет, родился {birthday.toLocaleString("ru-RU", { dateStyle: "long" })}
        </p>
        <p className="secondary">Контакты</p>
        <p>{resume.phone && showPhone(resume.phone)}</p>
        <p>{resume.email}</p>
        <p>Место проживания: {resume.city && resume.city.name}</p>
        <div className="flex flex-jc-sb">
          <div>
            <h1>{resume.position}</h1>
            <p>
              Занятость:{" "}
              {resume.employmentTypes &&
                resume.employmentTypes.map((et, index) => {
                  if (index < resume.employmentTypes.length - 1) {
                    return `${et.name}, `;
                  }
                  return `${et.name}.`;
                })}
            </p>
          </div>
          <div>
            <h1>
              {resume.salary} {resume.salary_type}
            </h1>
          </div>
        </div>

        <h3>Опыт работы</h3>
        {resume.workingHistories &&
          resume.workingHistories.map((job) => {
            let start = new Date(job.start_date);
            let end = new Date(job.end_date);
            return (
              <div key={job.id} className="flex working-history">
                <div className="working-history-date">
                  {start.toLocaleString(undefined, { month: "long", year: "numeric" })} -{" "}
                  {end.toLocaleString(undefined, { month: "long", year: "numeric" })}
                </div>
                <div className="working-history-info">
                  <h4>{job.company_name}</h4>
                  <h4>{job.company_description}</h4>
                  <p>{job.responsibilities}</p>
                </div>
              </div>
            );
          })}
        <h3>Ключевые навыки</h3>
        {resume.skills &&
          resume.skills.split(",").map((skill, index) => (
            <span key={index} className="tag mr4">
              {skill}
            </span>
          ))}
        <h3>Обо мне</h3>
        <p>{resume.about}</p>
        <h3>Образование</h3>
        {resume.education &&
          resume.education.map((ed) => {
            let end = new Date(ed.end_date);

            return (
              <div key={ed.id} className="flex working-history">
                <div className="working-history-date">{end.getFullYear()} г.</div>
                <div className="working-history-info">
                  <h4>{ed.university_name}</h4>
                  <h4>{ed.major}</h4>
                </div>
              </div>
            );
          })}
        <h3>Знание языков</h3>
        {resume.foreignLanguages &&
          resume.foreignLanguages.map((fl) => (
            <p className="tag mr4" key={fl.id}>
              {fl.name} - {fl.level}
            </p>
          ))}
        <h3>Гражданство</h3>
        <p>{resume.citizenshipObj?.name}</p>
      </div>
    </main>
  );
}
