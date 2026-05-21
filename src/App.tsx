import { useState, useEffect } from 'react';

interface Habit {
  id: number;
  text: string;
  completed: boolean;
}

export default function App() {
  const [habitText, setHabitText] = useState<string>('');

  const [habits, setHabits] = useState<Habit[]>(() => {
    const savedHabits = localStorage.getItem('habit_flow_data');
    return savedHabits ? JSON.parse(savedHabits) : [];
  });

  useEffect(() => {
    localStorage.setItem('habit_flow_data', JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (habitText.trim() === '') {
      window.alert('Please enter a habit!');
      return;
    }

    const newHabit: Habit = {
      id: Date.now(),
      text: habitText.trim(),
      completed: false,
    };

    setHabits([...habits, newHabit]);
    setHabitText('');
  };

  const toggleHabit = (id: number) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  const deleteHabit = (id: number) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const clearAllHabits = () => {
    if (window.confirm('Are you sure you want to clear all habits?')) {
      setHabits([]);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Habit Flow</h1>
        <p>Small steps, every day.</p>
      </header>

      <div className="input-section">
        <input
          type="text"
          value={habitText}
          onChange={(e) => setHabitText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addHabit()}
          placeholder="Enter a new habit"
        />
        <button onClick={addHabit}>Add Habit</button>
      </div>

      <ul id="habitList">
        {habits.map((habit) => (
          <li key={habit.id} className={`habit-item ${habit.completed ? 'completed' : ''}`}>
            <span>{habit.text}</span>
            <div className="item-actions">
              <button
                className="complete-btn"
                onClick={() => toggleHabit(habit.id)}
                style={{
                  background: habit.completed ? '#fee2e2' : '#ecfdf5',
                  color: habit.completed ? '#991b1b' : '#059669',
                }}
              >
                {habit.completed ? 'Uncheck' : 'Check'}
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteHabit(habit.id)}
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>

      {habits.length > 0 && (
        <button className="clear-all-btn" onClick={clearAllHabits}>
          Clear All Habits
        </button>
      )}
    </div>
  );
}