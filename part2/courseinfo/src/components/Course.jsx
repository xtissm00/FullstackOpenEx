const Header = ({course}) => <h2>{course}</h2> 

const Part = ({part,exercises})=><p>{part} {exercises}</p>

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      )} 
    </div>
  )
}

const Total = ({parts}) => {
  const totalExercs = parts.reduce((accumulator, part) => accumulator + part.exercises,0);
  return <h3>total of {totalExercs} exercises</h3>  
}

const Course = ({course}) =>{
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course