import React, { useState, useEffect } from 'react';
import { Button, Input, Form, FormGroup, Label } from 'reactstrap';
import axios from 'axios';

const StudyGoals = () => {
  const [goal, setGoal] = useState('');

  const handleGoalChange = (e) => {
    setGoal(e.target.value);
  };

  const saveGoal = async () => {
    try {
      const response = await axios.post('api/saveGoal', { goal });
      console.log(response.data);
    } catch (error) {
      console.error('Error saving goal: ', error);
    }
  };

  return (
    <div>
      <h1>Set Your Study Goals</h1>
      <Form>
        <FormGroup>
          <Label for="goal">Enter your study goal:</Label>
          <Input
            type="text"
            name="goal"
            id="goal"
            placeholder="E.g., Study for 2 hours"
            value={goal}
            onChange={handleGoalChange}
          />
        </FormGroup>
        <Button onClick={saveGoal}>Save Goal</Button>
      </Form>
    </div>
  );
};

export default StudyGoals;