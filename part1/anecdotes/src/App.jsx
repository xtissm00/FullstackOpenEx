import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>
const Anecdote = ({index, anecdotes, votes}) => {
  return (
    <div>
      <p>{anecdotes[index]}</p>
      <p>has {votes[index]} votes</p>
    </div>
  )
}

const MostVotedAnecdote = ({index, anecdotes, votes}) => {
  if (index == null) return <div><p>No votes yet. Be the first!</p></div>
  
  return <Anecdote index={index} anecdotes={anecdotes} votes={votes} /> 
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(null)

  const handleClickVote = () => {
    const updatedVotes = [...votes]
    updatedVotes[selected] += 1
    setVotes(updatedVotes)

    if ( mostVoted == null || updatedVotes[selected] > updatedVotes[mostVoted]) {
      setMostVoted(selected)
    }
  }

  const handleClickNext = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote index={selected} anecdotes={anecdotes} votes={votes} />
      <Button handleClick={handleClickVote} text='vote' />
      <Button handleClick={handleClickNext} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <MostVotedAnecdote index={mostVoted} anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App