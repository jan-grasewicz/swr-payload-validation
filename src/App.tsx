import { useCatFact } from "./useCatFact";

function App() {
  const { isLoading, error, data } = useCatFact();

  if (isLoading) return <p style={{ color: "lightblue" }}>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error.message}</p>;
  return <p>{data?.fact}</p>;
}

export default App;
