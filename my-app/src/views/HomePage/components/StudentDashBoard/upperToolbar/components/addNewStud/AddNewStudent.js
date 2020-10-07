import React, { useState, useContext } from 'react';
import AddNewStudentForm from './AddNewStudentForm';
import { addStudentToDb } from '../../../../../../../lib/api';
import Context from '../../../../../../../context/Context';

const Studentskills = [
  'Potions',
  'Ancient Runes',
  'Astronomy',
  'Defense Against the Dark Arts',
  'History of Magic',
  'Transfiguration',
  'Herbology',
  'Flying',
  ' Care of Magical Creatures',
  'Disarming Charm',
  'turning beetles into buttons',
];

const AddNewStudent = () => {
  const context = useContext(Context);
  const { makeApiRequest } = context;
  const labels = [1, 2, 3, 4, 5];
  const [skillList, setSkillList] = useState([...Studentskills]);
  const [formInput, setFormInput] = useState({
    first_name: '',
    last_name: '',
    email: '',
    existing_skills: {},
    interested_courses: [],
  });
  const [chosenSkills, setChosenSkills] = useState({
    currentSkill: '',
    confirmedSkills: [],
  });
  const [disableConfirmExSkillBtn, setDisableConfirmExSkillBtn] = useState(
    true
  );
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorFetchUsers, setErrorFetchUsers] = useState({
    activateAlert: null,
    message: '',
  });

  const HandleOnExistingSkillChange = (e) => {
    const { value } = e.target;
    setDisableConfirmExSkillBtn(false);
    setChosenSkills((prevState) => ({
      ...prevState,
      currentSkill: value,
    }));
  };
  const addSkill = (e) => {
    setDisableConfirmExSkillBtn(true);
    e.preventDefault();
    const current = chosenSkills.currentSkill;

    let selectedSkills = formInput.interested_courses;
    const filteredSelected = selectedSkills.filter((el) => {
      return el !== current;
    });

    setFormInput((prevState) => ({
      ...prevState,
      existing_skills: { ...prevState.existing_skills, [current]: '1' },
      interested_courses: [...filteredSelected],
    }));
    setChosenSkills((prevState) => ({
      currentSkill: null,
      confirmedSkills: [...prevState.confirmedSkills, prevState.currentSkill],
    }));
    const filtered = skillList.filter((item) => {
      return item !== current;
    });

    setSkillList(filtered);
  };

  const clearSkill = (e) => {
    const { name } = e.target;
    returnSkillToList(name);
    const filteredArr = chosenSkills.confirmedSkills.filter((item) => {
      return item !== name;
    });
    setChosenSkills((prevState) => ({
      prevState,
      confirmedSkills: filteredArr,
    }));
    let cleanInput = formInput.existing_skills;
    delete cleanInput[name];
  };

  const changeLevel = (e) => {
    const { name, value } = e.target;

    setFormInput((prevState) => ({
      ...prevState,
      existing_skills: { ...prevState.existing_skills, [name]: value },
    }));
  };

  const returnSkillToList = (name) => {
    const newSkillList = skillList;
    newSkillList.push(name);
    setSkillList(newSkillList);
  };

  const handleOnInterestedInCoursesChange = (e) => {
    const { value, checked } = e.target;
    const selectedSkills = formInput.interested_courses;
    if (checked) {
      selectedSkills.push(value);
      setFormInput((prevState) => ({
        ...prevState,
        interested_courses: [...selectedSkills],
      }));
    } else {
      const filteredSelected = selectedSkills.filter((el) => {
        return el !== value;
      });
      setFormInput((prevState) => ({
        ...prevState,
        interested_courses: [...filteredSelected],
      }));
    }
  };
  const showSuccessMessage = (response) => {
    setSuccessMessage(response);
  };
  const handleOnTextFieldChange = (name, value) => {
    setFormInput((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmitForm = (e) => {
    let dataToSubmit = formInput;
    setErrorFetchUsers({
      activateAlert: null,
      message: '',
    });
    let arrayedSkills = Object.entries(
      formInput.existing_skills
    ).map((item) => ({ [item[0]]: item[1] }));
    dataToSubmit.existing_skills = arrayedSkills;
    makeApiRequest(
      addStudentToDb,
      formInput,
      showSuccessMessage,
      handleSubmitForm,
      setErrorFetchUsers
    );
  };
  // console.log(formInput);
  // console.log(chosenSkills);
  // console.log(skillList);

  return (
    <div>
      <AddNewStudentForm
        labels={labels}
        setFormInput={handleOnTextFieldChange}
        chosenSkills={chosenSkills}
        changeLevel={changeLevel}
        HandleOnExistingSkillChange={HandleOnExistingSkillChange}
        skillList={skillList}
        handleOnInterestedInCoursesChange={handleOnInterestedInCoursesChange}
        clearSkill={clearSkill}
        addSkill={addSkill}
        disableConfirmExSkillBtn={disableConfirmExSkillBtn}
        sendForm={handleSubmitForm}
        uponSuccess={successMessage}
        errorFetchUsers={errorFetchUsers}
      />
    </div>
  );
};
export default AddNewStudent;
