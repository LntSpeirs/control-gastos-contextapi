import { useMemo } from 'react';
import { useBudget } from '../hooks/useBudget';
import ExpenseDetail from './ExpenseDetail';

const ExpenseList = () => {
  const { state } = useBudget();

  const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses]);

  return (
    <div className="mt-40">
      {isEmpty ? (
        <p className="text-gray-600 text-2xl font-bold">No hay gastos</p>
      ) : (
        <>
          <p className="text-gray-600 text-2xl font-bold my-5">
            Listado de gastos
          </p>
          {state.expenses.length > 0 && (
            <legend>
              Puede arrastar y soltar de izquierda a derecha para editar o al
              contrario para eliminar
            </legend>
          )}
          {state.expenses.map((expense) => (
            <ExpenseDetail key={expense.id} expense={expense} />
          ))}
        </>
      )}
    </div>
  );
};

export default ExpenseList;
