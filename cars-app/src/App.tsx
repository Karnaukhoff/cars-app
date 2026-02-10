import { useEffect, useState } from 'react';
import './App.css';

// +Вывод списка машин (name, model, year, price)
// Создание машины (name, model, year, color, price)
// Редактирование машины (по полю name и price)
// Удаление машины
// Сделать сортировку машин по year и price

interface IVehicles {
  id: number,
  name: string,
  model: string,
  year: number,
  color: string,
  price: number,
  latitude: number,
  longitude: number
}

function App() {
  const [vehicles, setVehicles] = useState<IVehicles[]>([]);

  useEffect(() => {
    fetch('https://task.tspb.su/test-task/vehicles')
      .then(res => res.json())
      .then((data: IVehicles[]) => setVehicles(data))
      .catch(err => console.error(err))
  }, []);

  const headerNames: string[] = [ "Марка" , "Модель", "Год выпуска", "Цвет", "Цена" ];

  return (
    <div className="App">
      <table className="table">
        <thead className="table__head">
          <tr className="table__row">
            {headerNames.map(title => (
              <th className="table__row_title">{title}</th>
            ))}
          </tr>
        </thead>
        <tbody className="table__body">
          {vehicles.map(vehicle => (
            <tr className="table__row" key={vehicle.id}>
              <td className="table__row_data">{vehicle.name}</td>
              <td className="table__row_data">{vehicle.model}</td>
              <td className="table__row_data">{vehicle.year}</td>
              <td className="table__row_data">{vehicle.color}</td>
              <td className="table__row_data">{vehicle.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;