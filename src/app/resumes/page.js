"use client";
import Header from "@/components/header";
import MyResumes from "@/components/myresumes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyResumes } from "@/app/store/slices/resumeSlice";
import Link from "next/link";

export default function ResumePage() {
  const dispatch = useDispatch();
  const resumes = useSelector((state) => state.resume.resumes);
  const didMount = () => {
    dispatch(getMyResumes());
  };
  useEffect(didMount, []);

  return (
    <main>
      <Header />
      <div className="container ptb7">
        <div className="flex flex-ai-c flex-jc-sb">
          <h1>Мои резюме</h1>
          <Link className="button button-secondary-bordered" href="/create-resume">
            Создать резюме
          </Link>
        </div>
        <MyResumes resumes={resumes} />
      </div>
    </main>
  );
}
