import { useState } from 'react'
import './App.css'
import { ApiCall } from './componets/ApiCall';


function App() {
  const users=[{
    uname:'john',
    age:21,
    city:'london',
  },{
     uname:'mill',
     age:23,
     city:'New York',

  }];
  const [search, setSearch] = useState('')
  
  const [city,setCity]=useState('')
  const [sorts,setSorts]=useState('asc')

  const filter = users.filter((user) => {
    const isSearch = user.uname.toLowerCase().includes(search.toLowerCase()) ||
                             user.city.toLowerCase().includes(search.toLowerCase());
    const isCity = !city || user.city.toLowerCase() === city.toLowerCase();
    
    return isSearch && isCity;
  });
 
   const datasort = [...filter].sort((a, b) => {
    if (sorts === 'asc') {
      return a.age - b.age;
    } else {
      return b.age - a.age;
    }
  });
  const handleInput=(e)=>{
    setSearch(e.target.value)
    
//  const cities = users.filter((users)=>
  //  users.city.includes(searchs)
    
  // );

  //setFilter(filters);
  };
  
   const handleevent = () => {
   
    setSorts((Sorts) => (Sorts === 'asc' ? 'desc' : 'asc'));
  };


 const selectCity = (e) => {
    setCity(e.target.value);
   

  };
  
 
  const filters = datasort;

  return (
    <>
    <div className='center'>
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={handleInput}
      />

      <select onChange={selectCity} value={city}>
        <option value=""> city</option>
        {
          
          [...new Set(users.map(user => user.city))].map((City, index) => (
            <option key={index} value={City}>{City}</option>
          ))
        }
      </select>

      <button onClick={handleevent}>
       sorted: {sorts === 'asc' ? 'Ascending' : 'Descending'}
      </button>

      {filters.map((user, index) => (
        <ul key={index}>
          <li>{user.uname}</li>
          <li>{user.age}</li>
          <li>{user.city}</li>
        </ul>
      ))}
       <ApiCall/>
      </div>
     
      
    </>
  );
}



export default App
