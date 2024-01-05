"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { sendVerificationEmail, verifyCode } from "@/app/store/slices/authSlice";
import Link from "next/link";
export default function UserLogin() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(119);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const router = useRouter();
  const sendVerifyEmail = () => {
    dispatch(sendVerificationEmail(email));
    setStep(2);
  };
  const verifyCodeFunction = () => {
    dispatch(verifyCode(email, code));
  };

  useEffect(() => {
    let interval;
    if (step === 2) {
      interval = setInterval(() => {
        if (timer !== 0) setTimer((timer) => timer - 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
  }, [step]);

  useEffect(() => {
    if (isAuth) {
      router.push("/resumes");
    }
  }, [isAuth]);

  const min = parseInt(timer / 60);
  const sec = timer % 60;

  return (
    <section className="login-page">
      {isAuth ? "true" : "false"}
      {step === 1 && (
        <div className="card">
          <h1>Поиск работы</h1>
          <form action="">
            <input
              className="input"
              type="text"
              placeholder="Введите email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <button className="button button-primary" onClick={sendVerifyEmail}>
              Продолжить
            </button>
          </form>
        </div>
      )}
      {step === 1 && (
        <div className="card">
          <h1>Поиск сотрудников</h1>
          <p>Размещение вакансий и доступ к базе резюме</p>
          <Link className="button button-primary-bordered" href="/employer/signin">
            Я ищу сотрудников
          </Link>
        </div>
      )}
      {step === 2 && (
        <div className="card">
          <h1>Отправили код на {email}</h1>
          <p>Напишите его чтобы подтвердить что это вы, а не кто-то другой</p>
          <form action="">
            <input
              className="input"
              type="text"
              placeholder="Введите код"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
              }}
            />
            <p>
              Повторить можно через {min}:{sec}
            </p>
            <button type="button" className="button button-primary" onClick={verifyCodeFunction}>
              Продолжить
            </button>
            <button
              className="button button-primary-bordered"
              onClick={() => {
                setStep(1);
              }}
            >
              Назад
            </button>
          </form>
        </div>
      )}
      {/* {step === 3 && (
        <div className="card">
          <h1>Давайте познакомимся!</h1>
          <form action="">
            <input className="input" type="text" placeholder="Имя" />
            <input className="input" type="text" placeholder="Фамилия" />
            <button className="button button-primary" type="button" onClick={() => dispatch(authorize())}>
              Продолжить
            </button>
          </form>
        </div>
      )} */}
    </section>
  );
}
