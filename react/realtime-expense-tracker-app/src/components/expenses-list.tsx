import { useCollectionQuery } from "@tanstack-query-firebase/react/firestore";
import { collection } from "firebase/firestore";
import { db } from "../main";

const ExpensesList = () => {
  const expensesQuery = useCollectionQuery(collection(db, "expenses"), {
    queryKey: ["expenses"],
  });

  if (expensesQuery.isLoading) return <p>Loading...</p>;
  if (expensesQuery.isError) return <p>Error loading expenses</p>;

  return (
    <ul>
      {expensesQuery.data?.docs.map((doc) => (
        <li key={doc.id}>
          {doc.data().name} - ${doc.data().amount}
        </li>
      ))}
    </ul>
  );
};

export default ExpensesList;
