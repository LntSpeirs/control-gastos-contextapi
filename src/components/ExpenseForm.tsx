import { categories } from '../data/categories';

import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { DraftExpense, Value } from '../types';
import ErrorMessage from './ErrorMessage';
import { useBudget } from '../hooks/useBudget';

const ExpenseForm = () => {
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date()
  });

  const [error, setError] = useState('');

  const { dispatch, state } = useBudget();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const isAmountField = ['amount'].includes(name);

    setExpense({
      ...expense,
      [name]: isAmountField ? +value : value
    });
  };

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Validación
    if (
      Object.values(expense).includes('') ||
      Object.values(expense).includes(0) ||
      expense.date === undefined ||
      expense.date === null
    ) {
      //console.log('Error, algun campo está vacio');
      setError('Todos los campos son obligatorios');
      return;
    }

    //Pasa la validación asi que guardamos o actualizamos el gasto
    if (state.editingId) {
      //Mirar si estamos editando
      dispatch({
        type: 'update-expense',
        payload: { expense: { id: state.editingId, ...expense } }
      });
    } else {
      dispatch({ type: 'add-expense', payload: { expense } });
    }

    //reiniciar state (formulario)
    setExpense({
      amount: 0,
      expenseName: '',
      category: '',
      date: new Date()
    });
  };

  useEffect(() => {
    if (state.editingId) {
      const editingExpense = state.expenses.filter(
        (currentExpense) => currentExpense.id === state.editingId
      )[0];
      setExpense(editingExpense);
    }
  }, [state.editingId]);

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        {state.editingId ? 'Editar gasto' : 'Nuevo gasto'}
      </legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre de gasto:
        </label>
        <input
          type="text"
          id="expenseName"
          name="expenseName"
          placeholder="Añade el nombre del gasto"
          className="bg-stalte-100 p-2"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Cantidad:
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          placeholder="Añade la cantidad del gasto"
          className="bg-stalte-100 p-2"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Categoria:
        </label>
        <select
          id="category"
          name="category"
          className="bg-stalte-100 p-2"
          value={expense.category}
          onChange={handleChange}
        >
          <option value={''}>-- Seleccione --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="category" className="text-xl">
          Fecha gasto:
        </label>
        <DatePicker
          className={'bg-slate-100 p-2 border-0'}
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>

      <input
        type="submit"
        className="bg-blue-600 hover:bg-blue-800 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
        value={state.editingId ? 'Editar gasto' : 'Guardar gasto'}
      />
    </form>
  );
};

export default ExpenseForm;
