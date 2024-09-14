import { Button } from "@gen-z/ui";

function App() {
  return (
    <section>
      <h1>React</h1>
      <Button primary onClick={() => alert("hi")}>
        Click
      </Button>
    </section>
  );
}

export default App;
