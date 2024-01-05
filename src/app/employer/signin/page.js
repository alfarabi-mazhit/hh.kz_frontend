"use client";
import { setError, signIn } from "@/app/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function EmployerSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  useEffect(() => {
    return () => {
      dispatch(setError(null));
    };
  }, []);
  const handleSignIn = () => {
    dispatch(signIn({ email, password }, router));
  };
  return (
    <main className="bg">
      <div className="container">
        <div className="auth-header">
          <img src="/images/logo.svg" alt="" />
          <p>
            Зарегестрируйтесь сейчас, чтобы купить доступ к базе резюме или публикацию вакансий по выгодным ценам - все акции уже ждут вас в разделе
            "Спецпредложения".
          </p>
          <p>Ответи на ваши вопросы</p>
          <a href="tel:77272321313">+7 727 232 13 13</a>
        </div>
      </div>
      <section className="login-page">
        <div className="card">
          <h1>Вход для поиска сотрудников</h1>
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
            <input
              className="input"
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button type="button" className="button button-primary" onClick={handleSignIn}>
              Войти
            </button>
          </form>
        </div>
        {error &&
          Object.keys(error).map((key) => (
            <p className="error" key={key}>
              {error[key]}
            </p>
          ))}
      </section>
    </main>
  );
}
