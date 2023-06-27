// -для выполнения первого задания вам нужно было получить всех студентов c помощью querySelectorAll() а далее собрать данные циклом по каждому и закинуть в заранее созданный массив

const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

const students = xmlDoc.querySelectorAll('student');
const studentsArray = [];

students.forEach((student) => {
  const nameElement = student.querySelector('name');
  const firstName = nameElement.querySelector('first').textContent;
  const lastName = nameElement.querySelector('second').textContent;
  const age = student.querySelector('age').textContent;
  const prof = student.querySelector('prof').textContent;

  const studentObj = {
    firstName: firstName,
    lastName: lastName,
    age: age,
    profession: prof,
  };

  studentsArray.push(studentObj);
});

console.log(studentsArray);