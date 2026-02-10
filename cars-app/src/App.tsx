import { useEffect, useState } from "react";
import "./App.scss";
import AddingVehicle from "./components/AddingVehicle.tsx";
import Vehicle from "./components/Vehicle.tsx";
import EditingVehicle from "./components/EditingVehicle.tsx";

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
const sorts: string[] = [
  "По умолчанию",
  "По году: от наименьшего к наибольшему",
  "По году: от наибольшего к наименьшему",
  "По цене: от наименьшего к наибольшему",
  "По цене: от наибольшего к наименьшему"
];

function App() {
  const [vehicles, setVehicles] = useState<IVehicles[]>([]);
  const [sortType, setSortType] = useState<string>(sorts[0]);
  const [isChanging, setIsChanging] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [year, setYear] = useState<number | null | undefined>();
  const [color, setColor] = useState<string>("");
  const [price, setPrice] = useState<number | null | undefined>();
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
  };

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
  };

  function deleteVehicle(id: number) {
    setVehicles((prev) => prev.filter((vehicle) => vehicle.id !== id));
  };

  function initialEditingValues(vehicle: IVehicles) {
    setName(vehicle.name);
    setPrice(vehicle.price);
  };

  function editVehicle() {
    if (name && price) {
      const selected = vehicles.find((vehicle) => vehicle.id === actionId);
      if (!selected) return;

      const updatedVehicle: IVehicles = {
        ...selected,
        name: name || selected.name,
        price: price,
      };

      setVehicles((prev) =>
        prev.map((vehicle) =>
          vehicle.id === actionId ? updatedVehicle : vehicle,
        ),
      );
      setIsEditing(false);
      setName("");
      setPrice(null);
    } else {
      alert("Необходимо завершить текущий процесс редактирования машины");
    }
  };

  function getSortedVehicles(): IVehicles[] {
    const sorted = [...vehicles];

    switch (sortType) {
      case "По году: от наименьшего к наибольшему":
        sorted.sort((a, b) => Number(a.year) - Number(b.year));
        break;
      case "По году: от наибольшего к наименьшему":
        sorted.sort((a, b) => Number(b.year) - Number(a.year));
        break;
      case "По цене: от наименьшего к наибольшему":
        sorted.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "По цене: от наибольшего к наименьшему":
        sorted.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      default:
        break;
    }

    return sorted;
  };

  return (
    <>
      <div className="table-controls">
        <p className="table-p">Сортировка: </p>
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          {sorts.map((sort) => (
            <option key={sort} value={sort}>
              {sort}
            </option>
          ))}
        </select>
      </div>
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
            {getSortedVehicles().map((vehicle) => {
              const isAddingVehicle =
                isChanging && vehicle.id === vehicles.length;
              const isDropdownOpen = actionId === vehicle.id;
              const isLastRow =
                vehicle.id === Math.max(...vehicles.map((v) => v.id));
              const isEdittingId = isEditing && vehicle.id === actionId;

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
                  ) : isEdittingId ? (
                    <EditingVehicle
                      name={name}
                      onChangeName={(e) => setName(e.target.value)}
                      model={vehicle.model}
                      price={price}
                      year={vehicle.year}
                      color={vehicle.color}
                      onChangePrice={(e) => setPrice(Number(e.target.value))}
                      onConfirm={editVehicle}
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
                      onEditVehicle={() => {
                        setIsEditing(true);
                        initialEditingValues(vehicle);
                      }}
                      onSendActionId={handleVehicleActionId}
                      isLastRow={isLastRow}
                      isDisabled={isEditing || isChanging}
                    />
                  )}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={headerNames.length}>
                <button
                  className="table__add-button"
                  onClick={addVehicle}
                  disabled={isEditing || isChanging}
                >
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
