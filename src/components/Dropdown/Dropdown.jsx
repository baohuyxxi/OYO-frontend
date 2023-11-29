import './Dropdown.scss';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { t } from 'i18next';
import { useState, useRef, useEffect, ChangeEvent } from 'react';

const Dropdown = (props) => {
    const [isActive, setIsActive] = useState(false);
    const refOne = useRef(null);

    const [adults, setAdults] = useState('1');
    const [children, setChildren] = useState('0');
    const [baby, setBaby] = useState('0');

    useEffect(() => {
        document.addEventListener('click', hideOnClickOutside, true);
    }, []);

    const hideOnClickOutside = (e) => {
        if (refOne.current && !refOne.current.contains(e.target)) {
            setIsActive(false);
        }
    };

    const handleChangeADULTS = (event) => {
        if (props.handleChangeGuests) {
            props.handleChangeGuests([
                {
                    guestCategory: 'numAdult',
                    number: event.currentTarget?.value,
                },
                {
                    guestCategory:'numChild',
                    number: children,
                },
                {
                    guestCategory:  'numBornChild',
                    number: baby,
                },
            ]);
        }
        if (props.setTitleGuests) {
            props.setTitleGuests(
                `${event.currentTarget?.value} ${t('contentMain.countClient.adults')}, ${children} ${t(
                    'contentMain.countClient.children',
                )}, ${baby} ${t('contentMain.countClient.baby')}`,
            );
        }
        setAdults(event.currentTarget?.value);
    };

    const handleChangeCHILDREN = (event) => {
        if (props.handleChangeGuests) {
            props.handleChangeGuests([
                {
                    guestCategory: 'numAdult',
                    number: adults,
                },
                {
                    guestCategory:'numChild',
                    number: event.currentTarget?.value,
                },
                {
                    guestCategory:  'numBornChild',
                    number: baby,
                },
            ]);
        }
        if (props.setTitleGuests) {
            props.setTitleGuests(
                `${adults} ${t('contentMain.countClient.adults')}, ${event.currentTarget?.value}  ${t(
                    'contentMain.countClient.children',
                )}, ${baby}  ${t('contentMain.countClient.baby')}`,
            );
        }
        setChildren(event.currentTarget?.value);
    };

    const handleChangeBABY = (event) => {
        if (props.handleChangeGuests) {
            props.handleChangeGuests([
                {
                    guestCategory: 'numAdult',
                    number: adults,
                },
                {
                    guestCategory:'numChild',
                    number: children,
                },
                {
                    guestCategory:  'numBornChild',
                    number: event.currentTarget?.value,
                },
            ]);
        }
        if (props.setTitleGuests) {
            props.setTitleGuests(
                `${adults} ${t('contentMain.countClient.adults')}, ${children} ${t(
                    'contentMain.countClient.children',
                )}, ${event.currentTarget?.value} ${t('contentMain.countClient.baby')}`,
            );
        }
        setBaby(event.currentTarget?.value);
    };

    return (
        <div className="dropdown" ref={refOne}>
            <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
                {`${adults} ${t('contentMain.countClient.adults')}, ${children} ${t(
                    'contentMain.countClient.children',
                )}, ${baby} ${t('contentMain.countClient.baby')}`}
                <ExpandMoreIcon />
            </div>
            {isActive && (
                <div className="dropdown-content">
                    <div className="dropdown-item">
                        {t('contentMain.countClient.adults')}
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            min="1"
                            max="5"
                            defaultValue={1}
                            onChange={handleChangeADULTS}
                        ></input>
                    </div>
                    <div className="dropdown-item">
                        {t('contentMain.countClient.children')}
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            min="1"
                            max="5"
                            defaultValue={0}
                            onChange={handleChangeCHILDREN}
                        ></input>
                    </div>
                    <div className="dropdown-item">
                        {t('contentMain.countClient.baby')}
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            min="1"
                            max="5"
                            defaultValue={0}
                            onChange={handleChangeBABY}
                        ></input>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
