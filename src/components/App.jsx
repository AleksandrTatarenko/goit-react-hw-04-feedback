import { useState, useEffect} from 'react';
import { Section } from 'components/Section/Section';
import { FeedbackOptions } from "components/FeedbackOptions/FeedbackOptions";
import { Statistics } from "components/Statistics/Statistics";
import { Notification } from './Notification/Notification';

export const App = () => {
    const [good, setCounterGood] = useState(0);
    const [neutral, setCounterNeutral] = useState(0);
    const [bad, setCounterBad] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [total, setTotal] = useState(0);
    const [positiveFeedback, setPositiveFeedback] = useState(0);


    const handleIncrement = (e) => {
        const { name } = e.target;
        switch (name) {
            case 'good':
                setCounterGood(prevState => prevState + 1);
                break;
            case 'neutral':
                setCounterNeutral(prevState => prevState + 1);
                break;
            case 'bad':
                setCounterBad(prevState => prevState + 1);
                break;
            default:
                console.log(`Тип поля ${name} не обрабатывается!`);
        }
    }

    useEffect(() => {
        if (good > 0 || neutral > 0 || bad > 0) {
            setIsOpen(true);
            setTotal((good + neutral + bad));
            setPositiveFeedback(Math.round(good / total * 100));
            return;
        }
        console.log(`Пожалуйста, оставьте отзыв:)`)
    }, [good, neutral, bad, total]);

    return (
    <>
        <Section title={'Please leave feedback'} 
                children={<FeedbackOptions
                onLeaveFeedback={handleIncrement}    
                 options={Object.keys({good, neutral, bad})}
            />}
        />
        <Section title={'Statistics'}  
            children={isOpen ? <Statistics
                good={good} 
                neutral={neutral}   
                bad={bad} 
                total={total}
                positiveFeedback={positiveFeedback}     
            /> : <Notification message={'No feedback given'} />}  
        /> 
    </>) 
}
 