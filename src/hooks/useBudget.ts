import { useContext } from 'react';
import { BudgetContext } from '../context/BudgetContext';

export const useBudget = () =>{
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget debe ser usado en un BudgetProvider. Falta rodear la aplicación con el provider.');
  }
  return context;
};