import ImageSetting from '~/components/HostSetting/ImageSetting/ImageSetting';
import LocationSetting from '~/components/HostSetting/LocationSetting/LocationSetting';
import NavbarOwner from '~/components/NavbarOwner/NavbarOwner';
import ScrollspyComponent from '~/components/Scrollspy/Scrollspy';
import TittleSetting from '~/components/HostSetting/TitleSetting/TitleSetting';

import './ManagerRoom.scss';
import ConvenientSetting from '~/components/HostSetting/ConvenientSetting/ConvenientSetting';
import CountRoomSetting from '~/components/HostSetting/CountRoomSetting/CountRoomSetting';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import publicAccomPlaceAPI from '~/services/apis/publicAPI/publicAccomPlaceAPI';
import PriceDiscountSurchagre from '~/components/HostSetting/PriceDiscountSurchagre/PriceDiscountSurchagre';
import settingAccomSlice from '~/redux/settingAccomSlice';
import { useSelector, useDispatch } from 'react-redux';

const infoLink = {
    name: 'Chi tiết nhà cho thuê',
    urlLink: '/host/setting'
};

const backUrl = '/host/setting';

const item = ['', 'section1', 'section2', 'section3', 'section4', 'section5', 'section6'];

const ManagerRoom = () => {
    const dispatch = useDispatch();
    const dataHomeDetail = useSelector((state) => state.settingaccom.accom);
    const infoRoom = {
        accomName: dataHomeDetail?.accomName ? dataHomeDetail?.accomName : '',
        description: dataHomeDetail?.description,
        guide: dataHomeDetail?.guide,
        refundPolicy: dataHomeDetail?.refundPolicy
    };

    const detailPriceRoom = {
        pricePerNight: dataHomeDetail?.pricePerNight,
        discount: dataHomeDetail?.discount ? dataHomeDetail?.discount : 0,
        surchargeList: dataHomeDetail?.surchargeList ? dataHomeDetail?.surchargeList : []
    };

    const locationRoom = {
        addressGeneral: dataHomeDetail?.addressGeneral,
        addressDetail: dataHomeDetail?.addressDetail
    };

    const children = [
        {
            id: '#section1',
            to: 'section1',
            info: 'Hình ảnh',
            comp: (
                <ImageSetting
                    listImage={dataHomeDetail?.imageAccomsUrls}
                    thumbnail={dataHomeDetail?.imageAccomsUrls[0]}
                />
            )
        },
        {
            id: '#section2',
            to: 'section2',
            info: 'Thông tin cơ bản',
            comp: <TittleSetting infoRoom={infoRoom} />
        },
        {
            id: '#section3',
            to: 'section3',
            info: 'Chổ ở và phòng',
            comp: <CountRoomSetting accomCateName={dataHomeDetail?.accomCateName}  />
        },
        {
            id: '#section4',
            to: 'section4',
            info: 'Vị trí',
            comp: <LocationSetting locationRoom={locationRoom} />
        },
        {
            id: '#section5',
            to: 'section5',
            info: 'Tiện nghi',
            comp: <ConvenientSetting convent={dataHomeDetail?.facilityCategoryList} locationRoom={locationRoom}  />
        },
        {
            id: '#section6',
            to: 'section6',
            info: 'Định giá và phụ phí',
            comp: <PriceDiscountSurchagre detailPriceRoom={detailPriceRoom} />
        }
    ];

    const params = useParams();

    useEffect(() => {
        publicAccomPlaceAPI.getRoomDetail(params.idHome).then((dataResponse) => {
            dispatch(settingAccomSlice.actions.setAccom(dataResponse.data));
        });
    }, [params.idHome]);

    return (
        <div className="manager-room">
            <NavbarOwner />
            <ScrollspyComponent children={children} item={item} infoLink={infoLink} backUrl={backUrl} />
        </div>
    );
};

export default ManagerRoom;
