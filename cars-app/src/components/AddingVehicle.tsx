interface IProps {
    name: string;
    onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
    model: string;
    onChangeModel: (e: React.ChangeEvent<HTMLInputElement>) => void;
    year: number | undefined | null;
    onChangeYear: (e: React.ChangeEvent<HTMLInputElement>) => void;
    color: string;
    onChangeColor: (e: React.ChangeEvent<HTMLInputElement>) => void;
    price: number | undefined | null;
    onChangePrice: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onConfirm: () => void;
}

function AddingVehicle ({ name, onChangeName, model, onChangeModel, year, onChangeYear, color, onChangeColor, price, onChangePrice, onConfirm }: IProps) {
    return (
        <>
            <td className="table__row_data">
                <input
                    value={name}
                    onChange={onChangeName}
                />
            </td>
            <td className="table__row_data">
                <input
                    value={model}
                    onChange={onChangeModel}
                />
            </td>
            <td className="table__row_data">
                <input
                    type="number"
                    value={year ?? ''}
                    onChange={onChangeYear}
                />
            </td>
            <td className="table__row_data">
                <input
                    value={color}
                    onChange={onChangeColor}
                />
            </td>
            <td className="table__row_data">
                <input
                    type="number"
                    value={price ?? ''}
                    onChange={onChangePrice}
                />
            </td>
            <td className="table__row_data table__row_actions">
                <button
                    className="table__action-btn"
                    onClick={onConfirm}
                >
                    ✓
                </button>
            </td>
        </>
    )
};
export default AddingVehicle;