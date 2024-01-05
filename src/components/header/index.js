"use client";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "@/app/store/slices/authSlice";

export default function Header() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const currentUser = useSelector((state) => state.auth.currentUser);
  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <div>
            <Link href={"/"}>
              <img src="/images/logo.svg" />
            </Link>
            {currentUser?.role.name === "manager" && <Link href={"/vacancy"}>Мои вакансии</Link>}
            {currentUser?.role.name !== "manager" && <Link href={"/resumes"}>Мои резюме</Link>}
            <a>Помощь</a>
          </div>
          <div>
            <button className="header-search">
              <img src="/images/search.svg" />
              Поиск
            </button>
            {currentUser?.role.name === "manager" && (
              <Link href={"/create-vacancy"} className="header-button header-button--green">
                Создать вакансию
              </Link>
            )}
            {currentUser?.role.name !== "manager" && (
              <Link href={"/create-resume"} className="header-button header-button--green">
                Создать резюме
              </Link>
            )}

            {!isAuth && (
              <Link href={"/login"} className="header-button">
                Войти
              </Link>
            )}
            {isAuth && (
              <a className="header-button" onClick={() => dispatch(logOut())}>
                Выйти
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
