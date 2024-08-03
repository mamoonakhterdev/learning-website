// src/data.js
/*
  1. There are two type of categories. One is worksheet and other is practicequestion
  2. Upload your worksheet and practice questions on dropbox and copy the link and paste into download_link. https://www.dropbox.com/
  2. There are two subjects Science and Math and Grade from 1 to 10 and Kindergarten
*/ 
const data = [
  {
    id: 1,
    name_of_topic: "Basic Arithmetic",
    title: "Addition and Subtraction",
    subject: "Math",
    grade: "Grade 1",
    category: "worksheet",
    download_link: "https://www.dropbox.com/scl/fi/iglwfis63j21wmxr53i81/Mamoon-Akhter-Resume.pdf?rlkey=lvlbgpjasd9cii9gvligfrri5&st=fslnvp16&dl=0"
  },
  {
    id: 2,
    name_of_topic: "Fractions",
    title: "Introduction to Fractions",
    subject: "Math",
    grade: "Grade 2",
    category: "worksheet",
    download_link: "https://www.dropbox.com/scl/fi/iglwfis63j21wmxr53i81/Mamoon-Akhter-Resume.pdf?rlkey=lvlbgpjasd9cii9gvligfrri5&st=fslnvp16&dl=0"
  },
  {
    id: 3,
    name_of_topic: "Scientific Method",
    title: "Steps of the Scientific Method",
    subject: "Science",
    grade: "Grade 1",
    category: "worksheet",
    download_link: "https://www.dropbox.com/scl/fi/iglwfis63j21wmxr53i81/Mamoon-Akhter-Resume.pdf?rlkey=lvlbgpjasd9cii9gvligfrri5&st=fslnvp16&dl=0"
  },
  {
    id: 4,
    name_of_topic: "Photosynthesis",
    title: "Understanding Photosynthesis",
    subject: "Science",
    grade: "Grade 4",
    category: "practice question",
    download_link: "https://drive.google.com/file/d/15i6BCqWGJrvwcOROly3K81eqVVu5G7cf/view?usp=drive_link"
  }
];

export default data;
