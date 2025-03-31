import { useQuery } from '@apollo/client';
import { GET_ME } from './queries';

export function useCurrentUser() {
  const { data, loading, error } = useQuery(GET_ME);
  return {
    user: data?.me || null,
    loading,
    error,
  };
}
