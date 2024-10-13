import { useBudget } from '../hooks/useBudget';
import AmountDisplay from './AmountDisplay';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const BudgetTracker = () => {
  const { remainingBudget, totalExpenses, state } = useBudget();

  const percentaje = ((totalExpenses / state.budget) * 100).toFixed(2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar
          value={+percentaje}
          styles={buildStyles({
            pathColor: +percentaje === 100 ? '#DC2626' : '#3b82F6',
            trailColor: '#F5F5F5',
            textSize: 8
          })}
          text={`${percentaje}% gastado`}
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
        >
          Resetear app
        </button>

        <AmountDisplay label="Presupuesto" amount={state.budget} />
        <AmountDisplay label="Disponible" amount={remainingBudget} />
        <AmountDisplay label="Gastado" amount={totalExpenses} />
      </div>
    </div>
  );
};

export default BudgetTracker;
