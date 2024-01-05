"use client";
import { setError, signUp } from "@/app/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function EmployerSignUp() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [first_name, setName] = useState("");
  const [last_name, setSurname] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [company_description, setCompanyDescription] = useState("");
  const [company_address, setCompanyAddress] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [company_logo, setCompanyLogo] = useState();

  const dispatch = useDispatch();
  const router = useRouter();
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    return () => {
      dispatch(setError(null));
    };
  }, []);

  const onLogoChange = (e) => {
    setCompanyLogo(e.target.files[0]);
  };

  const handleSignup = () => {
    dispatch(
      signUp({
        email,
        full_name: first_name + " " + last_name,
        company_name,
        company_description,
        company_address,
        company_logo,
        password,
        password2,
      }, router)
    );
  };

  return (
    <main className="bg">
      <div className="container">
        <div className="auth-header">
          <img src="/images/logo.svg" alt="" />
          <p>
            Зарегестрируйтесь сейчас, чтобы купить доаступ к базе резюме или публикацию вакансий по выгодным ценам - все акции уже ждут вас в разделе
            "Спецпредложения".
          </p>
          <p>Ответи на ваши вопросы</p>
          <a href="tel:77272321313">+7 727 232 13 13</a>
        </div>
      </div>
      <section className="login-page">
        {step === 1 && (
          <div className="card">
            <h1>Регистрация для поиска сотрудников</h1>
            <p>В завершении на почту придет пароль</p>
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
              <button
                className="button button-primary"
                onClick={() => {
                  setStep(2);
                }}
              >
                Продолжить
              </button>
            </form>
          </div>
        )}
        {step === 2 && (
          <div className="card">
            <h1>Как вас зовут?</h1>
            <form action="">
              <input
                className="input"
                type="text"
                placeholder="Имя"
                value={first_name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                className="input"
                type="text"
                placeholder="Фамилия"
                value={last_name}
                onChange={(e) => {
                  setSurname(e.target.value);
                }}
              />
              <button
                type="button"
                className="button button-primary"
                onClick={() => {
                  setStep(3);
                }}
              >
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
        {step === 3 && (
          <div className="card">
            <h1>Введите название компании?</h1>
            <form action="">
              <input
                className="input"
                type="text"
                placeholder="Название компании"
                value={company_name}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                }}
              />
              <textarea
                className="textarea"
                type="text"
                placeholder="Описание компании"
                value={company_description}
                onChange={(e) => {
                  setCompanyDescription(e.target.value);
                }}
              ></textarea>
              <input
                className="input"
                type="text"
                placeholder="Адрес компании"
                value={company_address}
                onChange={(e) => {
                  setCompanyAddress(e.target.value);
                }}
              />
              <input className="input" type="file" placeholder="Лого компании" onChange={onLogoChange} />
              <button
                type="button"
                className="button button-primary"
                onClick={() => {
                  setStep(4);
                }}
              >
                Продолжить
              </button>
              <button
                className="button button-primary-bordered"
                onClick={() => {
                  setStep(2);
                }}
              >
                Назад
              </button>
            </form>
          </div>
        )}
        {step === 4 && (
          <div className="card">
            <h1>Придумайте пароль</h1>
            <form action="">
              <input
                className="input"
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <input
                className="input"
                type="password"
                placeholder="Повторите пароль"
                value={password2}
                onChange={(e) => {
                  setPassword2(e.target.value);
                }}
              />
              <button type="button" className="button button-primary" onClick={handleSignup}>
                Завершить
              </button>
              <button
                className="button button-primary-bordered"
                onClick={() => {
                  setStep(3);
                }}
              >
                Назад
              </button>
            </form>
          </div>
        )}
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
