import { useEffect, useState, useCallback } from 'react';

import api from '../api';

import { showError } from './components/notifications';


/* react hook for fetching data from db */
export const useData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await api.getAll();
      setData(result);
      setIsLoading(false);
    } catch (err) {
      showError(err.message);
    }
  }, []);
  useEffect(() => {
    loadData();
  }, [loadData]);

  return { data, isLoading, loadData };
};

/* service for creating db records */
export const create = async (values) => api.create(values);
