import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from "@/components/config/end-point";

export const resumeSlice = createSlice({
  name: "resume",
  initialState: {
    resumes: [],
    resume: {},
  },
  reducers: {
    setMyResumes: (state, action) => {
      state.resumes = action.payload.resumes;
    },
    appendResume: (state, action) => {
      state.resumes = [...state.resumes, action.payload.newresume];
    },
    setResume: (state, action) => {
      state.resume = action.payload.resume;
    },
    handleDeletedResume: (state, action) => {
      let resumes = [...state.resumes];
      resumes.filter((item) => item.id !== action.payload);
      state.resumes = resumes;
    },
  },
});

export const { setMyResumes, appendResume, setResume, handleDeletedResume } = resumeSlice.actions;

export const getMyResumes = () => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/resume`);
    dispatch(setMyResumes({ resumes: res.data }));
  } catch (error) {
    alert("Что то пошло не так, сообщите об ошибке тех. поддержке сайта! " + error);
  }
};

export const getResumeById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/resume/${id}`);
    dispatch(setResume({ resume: res.data }));
  } catch (error) {
    alert("Что то пошло не так, сообщите об ошибке тех. поддержке сайта! " + error);
  }
};

export const createResume = (sendData, router) => async (dispatch) => {
  try {
    const res = await axios.post(`${END_POINT}/api/resume`, sendData);
    router.push("/resumes");
    dispatch(appendResume({ newresume: res.data }));
  } catch (error) {
    alert("Что то пошло не так, сообщите об ошибке тех. поддержке сайта! " + error);
  }
};

export const editResume = (sendData, router) => async (dispatch) => {
  try {
    const res = await axios.put(`${END_POINT}/api/resume`, sendData);
    router.push("/resumes");
  } catch (error) {
    alert("Что то пошло не так, сообщите об ошибке тех. поддержке сайта! " + error);
  }
};

export const deleteResume = (id, router) => async (dispatch) => {
  try {
    const res = await axios.delete(`${END_POINT}/api/resume/${id}`);
    dispatch(handleDeletedResume(id));
  } catch (error) {
    alert("Что то пошло не так, сообщите об ошибке тех. поддержке сайта! " + error);
  }
};
export default resumeSlice.reducer;
