import './Dropdown.scss';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { t } from 'i18next';
import { useState, useRef, useEffect, ChangeEvent } from 'react';

const Dropdown = (props) => {
    const [isActive, setIsActive] = useState(false);
    const refOne = useRef(null);


    useEffect(() => {
        document.addEventListener('click', hideOnClickOutside, true);
    }, []);

    const hideOnClickOutside = (e) => {
        if (refOne.current && !refOne.current.contains(e.target)) {
            setIsActive(false);
        }
    };

    const handleChange = (event) => {
        if (props.handleChangeGuests) {
            props.handleChangeGuests({...props.guests, [event.target.name]: event.target.value})
        }
    
    }

    return (
        <div className="dropdown" ref={refOne}>
            <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
                {`${props.guests.numAdult} ${t('contentMain.countClient.adults')}, ${props.guests.numChild} ${t(
                    'contentMain.countClient.children',
                )}, ${props.guests.numBornChild} ${t('contentMain.countClient.baby')}`}
                <ExpandMoreIcon />
            </div>
            {isActive && (
                <div className="dropdown-content">
                    <div className="dropdown-item">
                        {t('contentMain.countClient.adults')}
                        <input
                            type="number"
                            id="numAdult"
                            name="numAdult"
                            min="1"
                            max="1000"
                            defaultValue={props.guests.numAdult}
                            onChange={handleChange}
                        ></input>
                    </div>
                    <div className="dropdown-item">
                        {t('contentMain.countClient.children')}
                        <input
                            type="number"
                            id="numChild"
                            name="numChild"
                            min="0"
                            max="1000"
                            defaultValue={props.guests.numChild}
                            onChange={handleChange}
                        ></input>
                    </div>
                    <div className="dropdown-item">
                        {t('contentMain.countClient.baby')}
                        <input
                            type="number"
                            id="numBornChild"
                            name="numBornChild"
                            min="0"
                            max="1000"
                            defaultValue={props.guests.numBornChild}
                            onChange={handleChange}
                        ></input>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
