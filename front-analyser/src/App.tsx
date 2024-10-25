import 'bootstrap/dist/css/bootstrap.min.css';
import WordHierarchyApp from './components/WordHierarchyApp';
import { Container } from 'react-bootstrap';

const App: React.FC = () => {
  return (
    <Container className="App d-flex justify-content-center align-items-center vh-100">
      <WordHierarchyApp />
    </Container>
  );
};

export default App;
