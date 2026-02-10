import { useEffect, useState } from "react";
import "./App.scss";
import AddingVehicle from "./components/AddingVehicle.tsx";
import Vehicle from "./components/Vehicle.tsx";

// +Вывод списка машин (name, model, year, price)
// +Создание машины (name, model, year, color, price)
// Редактирование машины (по полю name и price)
// +Удаление машины
// --поправить удаление последнего элемента
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
  const [year, setYear] = useState<number | undefined | null>();
  const [color, setColor] = useState<string>("");
  const [price, setPrice] = useState<number | undefined | null>();
  const [actionId, setActionId] = useState<number | null>(null);
  function handleVehicleActionId(id: number | null) {
    setActionId(id);
  }

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

  function addVehicle() {
    if (!isChanging) {
      setIsChanging(true);

      const newVehicle = {
        id:
          vehicles.length > 0 ? Math.max(...vehicles.map((v) => v.id)) + 1 : 1,
        name: "",
        model: "",
        year: 0,
        color: "",
        price: 0,
        latitude: 0,
        longitude: 0,
      };
      setVehicles((prev) => [...prev, newVehicle]);
    } else alert("Необходимо завершить текущий процесс добавления машины");
  }

  function confirmAddVechicle() {
    if (name && model && year && color && price) {
      const newVehicle = {
        id: vehicles.length > 0 ? Math.max(...vehicles.map((v) => v.id)) : 1,
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
      setName("");
      setModel("");
      setYear(null);
      setColor("");
      setPrice(null);
    } else alert("Необходимо заполнить все поля");
  }

  function deleteVehicle(id: number) {
    setVehicles((prev) => prev.filter((vehicle) => vehicle.id !== id));
  }

  return (
    <>
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
              const isAddingVehicle =
                isChanging && vehicle.id === vehicles.length;
              const isDropdownOpen = actionId === vehicle.id;

              return (
                <tr
                  className={`table__row ${isDropdownOpen ? "table__row-selected" : ""}`}
                  key={vehicle.id}
                >
                  {isAddingVehicle ? (
                    <AddingVehicle
                      name={name}
                      onChangeName={(e) => setName(e.target.value)}
                      model={model}
                      onChangeModel={(e) => setModel(e.target.value)}
                      year={year}
                      onChangeYear={(e) => setYear(Number(e.target.value))}
                      color={color}
                      onChangeColor={(e) => setColor(e.target.value)}
                      price={price}
                      onChangePrice={(e) => setPrice(Number(e.target.value))}
                      onConfirm={confirmAddVechicle}
                    />
                  ) : (
                    <Vehicle
                      name={vehicle.name}
                      model={vehicle.model}
                      year={vehicle.year}
                      color={vehicle.color}
                      price={vehicle.price}
                      id={vehicle.id}
                      onDeleteVehicle={deleteVehicle}
                      onSendActionId={handleVehicleActionId}
                    />
                  )}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={headerNames.length}>
                <button className="table__add-button" onClick={addVehicle}>
                  +
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}

export default App;
