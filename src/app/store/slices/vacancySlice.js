import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from "@/components/config/end-point";

export const vacancySlice = createSlice({
  name: "vacancy",
  initialState: {
    vacancies: [],
    vacancy: {},
    specializations: [],
  },
  reducers: {
    setMyVacancies: (state, action) => {
      state.vacancies = action.payload.vacancies;
    },
    appendVacancy: (state, action) => {
      state.vacancies = [...state.vacancies, action.payload.newvacancy];
    },
    setVacancy: (state, action) => {
      state.vacancy = action.payload.vacancy;
    },
    handleDeletedVacancy: (state, action) => {
      let vacancies = [...state.vacancies];
      vacancies.filter((item) => item.id !== action.payload);
      state.vacancies = vacancies;
    },
    setSpecializations: (state, action) => {
      state.specializations = action.payload;
    },
  },
});

export const { setMyVacancies, appendVacancy, setVacancy, handleDeletedVacancy, setSpecializations } = vacancySlice.actions;

export const getMyVacancies = () => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/vacancy`);
    dispatch(setMyVacancies({ vacancies: res.data }));
  } catch (error) {
    alert("Что то пошло не так, сообщите об ошибке тех. поддержке сайта! " + error);
  }
};

export const getSpecializations = () => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/specializations`);
    dispatch(setSpecializations(res.data));
  } catch (error) {
    alert("Что то пошло не так, сообщите об ошибке тех. поддержке сайта! " + error);
  }
};

// export const getVacancyById = (id) => async (dispatch) => {
//   try {
//     const res = await axios.get(`${END_POINT}/api/vacancy/${id}`);
//     dispatch(setVacancy({ vacancy: res.data }));
//   } catch (error) {
//     alert("Что то пошло не так, сообщите об ошибке тех. поддержке сайта! " + error);
//   }
// };

// export const createResume = (sendData, router) => async (dispatch) => {
//   try {
//     const res = await axios.post(`${END_POINT}/api/resume`, sendData);
//     router.push("/resumes");
//     dispatch(appendResume({ newresume: res.data }));
//   } catch (error) {
//     alert("Что то пошло не так, сообщите об ошибке тех. поддержке сайта! " + error);
//   }
// };

// export const editResume = (sendData, router) => async (dispatch) => {
//   try {
//     const res = await axios.put(`${END_POINT}/api/resume`, sendData);
//     router.push("/resumes");
//   } catch (error) {
//     alert("Что то пошло не так, сообщите об ошибке тех. поддержке сайта! " + error);
//   }
// };

// export const deleteResume = (id, router) => async (dispatch) => {
//   try {
//     const res = await axios.delete(`${END_POINT}/api/resume/${id}`);
//     dispatch(handleDeletedResume(id));
//   } catch (error) {
//     alert("Что то пошло не так, сообщите об ошибке тех. поддержке сайта! " + error);
//   }
// };
export default vacancySlice.reducer;
