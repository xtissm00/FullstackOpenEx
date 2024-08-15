const Person = ({ person, onDelete }) => (
  <div>
    <p>{person.name} {person.number}</p>
    <button onClick={() => onDelete(person.id, person.name)}>delete</button>
  </div>
);

const PeopleList = ({ filter, people, onDelete }) => {
  const peopleToShow = people.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      {peopleToShow.map(person => (
        <Person key={person.name} person={person} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default PeopleList;