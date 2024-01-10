import Footer from './components/footer';
import NameInput from './components/Nameinput';
import logo from './logo.svg';
import './style.css';

function App() {
  return (
 <div>
    <div className="container mx-auto px-4 h-full ">

      <h1 className="text-3xl font-semibold underline">
            
      </h1>
      <NameInput  />
      
    </div>
    <Footer />
    </div>
  );
}

export default App;
