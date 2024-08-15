import { useState, useEffect } from 'react';
import PeopleList from './components/PeopleList';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import peopleService from './services/people';
import Notification from './components/Notification';


const App = () => {
  const [people, setPeople] = useState([]); 
  const [newName, setName] = useState('');
  const [newNumber, setNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState({ message: null, error: false });


  useEffect(() => {
    peopleService
      .getAll()
      .then(initialPeople => {
        setPeople(initialPeople)
      })
  }, []);

  const addPerson = (newPerson) => {      
    peopleService
    .createPerson(newPerson)
    .then(person => {
      setPeople(people.concat(person))
      setNumber('');
      setName('');
      setNotification({ message: `Added ${person.name}`, error: false });
      setTimeout(() => {
        setNotification({ message: null, error: false });
      }, 5000);

    })
    .catch(error => {
      console.error(error);
      setNotification({ message: `Could not add ${newPerson.name}`, error: true });
      setTimeout(() => {
        setNotification({ message: null, error: false })
      }, 5000);
    });
  
  }

  const updateNumber = (existingPerson) => {
    const updatedPerson = {
      ...existingPerson,
      number: newNumber  
    };

    peopleService
      .updatePerson(updatedPerson)
      .then(person => {
        const newPeople = people.map((p) =>
          p.name === person.name ? person : p
        );
        setPeople(newPeople);
        setNumber('');
        setName('');
        setNotification({ message: `Updated ${person.name}`, error: false });
        setTimeout(() => {
          setNotification({ message: null, error: false })
        }, 5000);
      })
      .catch(error => {
        console.error(error);
        setNotification({ message: `Information of ${updatedPerson.name} has already been removed from server`, error: true });
        setTimeout(() => {
          setNotification({ message: null, error: false })
        }, 5000);
        setPeople(people.filter(person => person.name !== updatePerson.name))
      });
  }

const handleSubmit = (event) => {
    event.preventDefault();
    const existingPerson = people.find(person => person.name === newName);
    
    if (existingPerson) {
      const confirmation = confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      );
      if (confirmation) {
        updateNumber(existingPerson);
      }
      return;
    }

    addPerson({ name: newName,
                number:newNumber,
                id: Date.now().toString() 
    });
  }

  const handleDelete = (id, name) => {
    const confirmation = confirm(`Delete ${name}?`)
    
    if (!confirmation) return 

    peopleService
    .deletePerson(id)
    .then(() => {
      setPeople(people.filter(person => person.name !== name))
      setNotification({ message: `Deleted ${name}`, error: false });
      setTimeout(() => {
        setNotification({ message: null, error: false })
      }, 5000);
    })
    .catch(error => {
      console.error(error)
      setNotification({ message: `Information of ${name} has already been removed from server`, error: true });
      setPeople(people.filter(person => person.name !== name));
      setTimeout(() => {
        setNotification({ message: null, error: false })
      }, 5000);
    });

  }

  const handleName = (event) => {
    setName(event.target.value)
  };
  const handleNumber = (event) => {
    setNumber(event.target.value)
  };
  const handleFilter = (event) => {
    setFilter(event.target.value.toLowerCase());
  };


  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification.message} error={notification.error} />
      <Filter filter={filter} onChange={handleFilter} />

      <h2>Add new person</h2>
      <PersonForm 
        name={newName} 
        number={newNumber} 
        handleName={handleName}
        handleNumber={handleNumber}
        handleSubmit={handleSubmit}
      />
      
      <h2>Numbers</h2>
      <PeopleList filter={filter} people={people} onDelete={handleDelete}/>
    </div>
  )
}

export default App