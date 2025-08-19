import './styles/App.css'
import products from './data/productsData.json';
import SignUp from './components/SignUp';
function App() {
 const a = products[0]
 console.log(a);
 
  return (
    <>
      <SignUp/>
       {/* <h1 className='text-emerald-400'>Cuisino</h1>
       <img src={a.image} alt="img"  /> */}
     
    </>
  )
}

export default App
