import { useEffect, useState } from "react";
import "./App.scss";

// +Вывод списка машин (name, model, year, price)
// +Создание машины (name, model, year, color, price)
// Редактирование машины (по полю name и price)
// Удаление машины
// Сделать сортировку машин по year и price

interface IVehicles {
  id: number;
  name: string;
  model: string;
  year: number;
  color: string;
  price: number;
  latitude: number;
  longitude: number;
}

function App() {
  const [vehicles, setVehicles] = useState<IVehicles[]>([]);
  const [isChanging, setIsChanging] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [year, setYear] = useState<number | undefined>();
  const [color, setColor] = useState<string>("");
  const [price, setPrice] = useState<number | undefined>();

  useEffect(() => {
    const getVehicles = async () => {
      try {
        const res = await fetch("https://task.tspb.su/test-task/vehicles");
        const data: IVehicles[] = await res.json();
        setVehicles(data);
      } catch (err) {
        console.error(err);
      }
    };
    getVehicles();
  }, []);

  const headerNames: string[] = [
    "Марка",
    "Модель",
    "Год выпуска",
    "Цвет",
    "Цена",
    "",
  ];

  function addVechicle() {
    setIsChanging(true);

    const newVehicle = {
      id: vehicles.length + 1,
      name: "",
      model: "",
      year: 0,
      color: "",
      price: 0,
      latitude: 0,
      longitude: 0,
    };
    setVehicles((prev) => [...prev, newVehicle]);
  }

  function confirmAddVechicle() {
    if (name && model && year && color && price) {
      const newVehicle = {
        id: vehicles.length,
        name: name,
        model: model,
        year: year,
        color: color,
        price: price,
        latitude: 0,
        longitude: 0,
      };
      setVehicles((prev) =>
        prev.map((vehicle) =>
          vehicle.id !== vehicles.length ? vehicle : newVehicle,
        ),
      );
      setIsChanging(false);
    } else alert("Необходимо заполнить все поля");
  }

  return (
    <div className="App">
      <table className="table">
        <thead className="table__head">
          <tr className="table__row">
            {headerNames.map((title) => (
              <th className="table__row_title">{title}</th>
            ))}
          </tr>
        </thead>
        <tbody className="table__body">
          {vehicles.map((vehicle) => {
            const isEditingRow = isChanging && vehicle.id === vehicles.length;

            return (
              <tr className="table__row" key={vehicle.id}>
                {isEditingRow ? (
                  <>
                    <td className="table__row_data">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </td>
                    <td className="table__row_data">
                      <input
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                      />
                    </td>
                    <td className="table__row_data">
                      <input
                        type="number"
                        value={year ?? ""}
                        onChange={(e) => setYear(Number(e.target.value))}
                      />
                    </td>
                    <td className="table__row_data">
                      <input
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                      />
                    </td>
                    <td className="table__row_data">
                      <input
                        type="number"
                        value={price ?? ""}
                        onChange={(e) => setPrice(Number(e.target.value))}
                      />
                    </td>
                    <td className="table__row_data table__row_actions">
                      <button
                        className="table__action-btn"
                        onClick={confirmAddVechicle}
                      >
                        ✓
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="table__row_data">{vehicle.name}</td>
                    <td className="table__row_data">{vehicle.model}</td>
                    <td className="table__row_data">{vehicle.year}</td>
                    <td className="table__row_data">{vehicle.color}</td>
                    <td className="table__row_data">{vehicle.price}</td>
                    <td className="table__row_data table__row_actions">
                      <button className="table__action-btn">⋮</button>
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={headerNames.length}>
              <button className="table__add-button" onClick={addVechicle}>
                +
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default App;
