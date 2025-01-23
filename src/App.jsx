import AuthProvider from "./context/AuthContext";
import Root from "./router/Root";
function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}

export default App;
