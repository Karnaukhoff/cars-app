interface IProps {
    name: string;
    onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
    model: string;
    year: number | undefined | null;
    color: string;
    price: number | null | undefined;
    onChangePrice: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onConfirm: () => void;
}

function EditingVehicle({name, onChangeName, model, price, year, color, onChangePrice, onConfirm}: IProps) {
    return(
        <>
            <td className="table__row_data">
                <input
                    value={name}
                    onChange={onChangeName}
                />
            </td>
            <td className="table__row_data">{model}</td>
            <td className="table__row_data">{year}</td>
            <td className="table__row_data">{color}</td>
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
export default EditingVehicle;