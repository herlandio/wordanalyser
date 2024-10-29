import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import WordHierarchyApp from './components/WordHierarchyApp';

const App: React.FC = () => {
  return (
    <Container className="App d-flex justify-content-center align-items-center vh-100">
      <WordHierarchyApp />
    </Container>
  );
};

export default App;
