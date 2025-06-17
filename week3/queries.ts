import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {Todo} from "./type";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export function useGetTodoList() {
  return useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await axios.get<Todo[]>(`${BASE_URL}/todos`);
      return res.data;
    }
  });
}