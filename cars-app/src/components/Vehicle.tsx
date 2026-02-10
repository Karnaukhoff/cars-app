import { useEffect, useRef, useState } from "react";

interface IProps {
    name: string;
    model: string;
    year: number;
    color: string;
    price: number;
    id: number;
    onDeleteVehicle: (id: number) => void;
    onSendActionId: (id: number | null) => void;
}

function Vehicle ({name, model, year, color, price, id, onDeleteVehicle, onSendActionId}: IProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

    useEffect(() => {
    if (isOpen) onSendActionId(id);
    }, [isOpen, id, onSendActionId]);

    return(
        <>
            <td className="table__row_data">{name}</td>
            <td className="table__row_data">{model}</td>
            <td className="table__row_data">{year}</td>
            <td className="table__row_data">{color}</td>
            <td className="table__row_data">{price}</td>
            <td className="table__row_data table__row_actions">
                <div className="action-menu">
                    <button
                        className="table__action-btn"
                        onClick={() => setIsOpen(prev => !prev)}
                    >
                        ⋮
                    </button>

                    {isOpen && (
                        <div className="action-menu__dropdown" ref={dropdownRef}>
                            <button className="action-menu__dropdown_button">Редактировать</button>
                            <button className="action-menu__dropdown_button" onClick={() => onDeleteVehicle(id)}>Удалить</button>
                        </div>
                    )}
                </div>
            </td>
        </>
    )
};
export default Vehicle;