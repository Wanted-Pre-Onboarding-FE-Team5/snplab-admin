import React from 'react';
// import { regionState } from '../../store/atom';
// import { useRecoilState } from 'recoil';
import { RegionDataType, RegionProps } from '../../types/Region.type';
import * as R from './Region.styled';
import { MdClose } from 'react-icons/md';
import { SubmitButton } from '../../styles/template';
import { regionService, getRegionData, siDoService, getSiDoData } from '../../api/api';
import { DEFAULT_SIDO } from '../../constants';

const Region = ({ setShowRegionModal }: any) => {
  const [regionData, setRegionData] = React.useState<RegionDataType[]>([]);
  const [region, setRegion] = React.useState<{ siDo: string; siGuGun: string }>({
    siDo: DEFAULT_SIDO,
    siGuGun: '',
  });

  const onClickSiDo = (siDo: string) => {
    if (region.siDo === siDo) return;
    setRegion({ siDo, siGuGun: '' });
  };

  const onClickSiGuGun = (siGuGun: string) => {
    if (region.siGuGun === siGuGun) return;
    setRegion((prevRegion) => ({ ...prevRegion, siGuGun }));
  };

  React.useEffect(() => {
    getRegionData<RegionDataType[]>(regionService).then((data) => {
      setRegionData(data);
    });
  }, []);
  console.log(regionData);

  return (
    <R.Container>
      <R.HeaderContainer>
        <R.CloseButton
          onClick={() => {
            setShowRegionModal(false);
          }}
        >
          <MdClose />
        </R.CloseButton>
        <R.HeaderText>거주지역 선택</R.HeaderText>
      </R.HeaderContainer>
      <R.ContentContainer>
        <R.MenuTitleContainer>
          <R.MenuTitle>시/도</R.MenuTitle>
          <R.MenuTitle>시/구/군</R.MenuTitle>
        </R.MenuTitleContainer>
        <R.MenuListContainer>
          <R.Menu>
            {Object.keys(regionData).map((siDo) => (
              <R.MenuList key={siDo} onClick={() => onClickSiDo(siDo)}>
                {siDo}
              </R.MenuList>
            ))}
          </R.Menu>

          <R.Menu>
            {/* {regionData[region.siDo].map(({siGuGun}: any) => (
              <R.MenuList key={siGuGun} onClick={() => onClickSiGuGun(siGuGun)}>
                {siGuGun}
              </R.MenuList>
            ))} */}
          </R.Menu>
        </R.MenuListContainer>
      </R.ContentContainer>
      <SubmitButton disabled={false}>확인</SubmitButton>
    </R.Container>
  );
};

export default Region;
