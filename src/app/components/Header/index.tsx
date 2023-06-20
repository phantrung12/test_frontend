import {
  Avatar,
  Button,
  Divider,
  Layout,
  Popover,
  Space,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import {
  MenuUnfoldOutlined,
  UserOutlined,
  BellOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../../store/configureStore';
import { path } from '../../routes/path';
import VnFlag from '../../../imgs/vn.svg';
import EnFlag from '../../../imgs/gb-eng.svg';
import { LocalStorageService } from '../../services';
import i18next from '../../../locales/i18n';

const countries = [
  { code: 'Vietnamese', label: VnFlag, id: 'vi' },
  { code: 'English', label: EnFlag, id: 'en' },
];

interface Props {
  onClickOpenSidebar?: () => void;
  collapse?: boolean;
}

const Header = ({ onClickOpenSidebar, collapse }: Props) => {
  const [openLanguage, setOpenLanguage] = useState(false);
  const dispatch = useAppDispatch();

  const { Header } = Layout;

  const handleChangeLanguage = (value: string) => {
    LocalStorageService.set(LocalStorageService.LANGUAGE, value);
    i18next.changeLanguage(value);
    setOpenLanguage(false);
  };

  const contentLanguage = (
    <Space direction="vertical">
      {countries.map(item => (
        <Button
          type="link"
          className="btn-flag"
          key={item?.id}
          onClick={() => handleChangeLanguage(item?.id)}
        >
          <img
            src={item.label}
            width={32}
            height={32}
            className="flag"
            style={{ cursor: 'pointer' }}
          />
          {item.code}
        </Button>
      ))}
    </Space>
  );

  const handleOpenChange = (newOpen: boolean) => {
    setOpenLanguage(newOpen);
  };

  return (
    <Header
      className={`site-layout-background header ${
        collapse ? 'close-header' : 'open-header'
      }`}
    >
      <Space className="justify-between w-100">
        <MenuUnfoldOutlined className="icon" onClick={onClickOpenSidebar} />
        <Space
          className=""
          size={'middle'}
          split={<Divider type="vertical" className="header-divider" />}
        >
          <Space size={'middle'}>
            <Button
              icon={<SearchOutlined className="icon" />}
              shape="circle"
              type="link"
            />
            <Button
              icon={<BellOutlined className="icon" />}
              shape="circle"
              type="link"
            />
            <Popover
              trigger="click"
              placement="bottom"
              content={contentLanguage}
              open={openLanguage}
              onOpenChange={handleOpenChange}
            >
              <img
                src={
                  countries.find(
                    item =>
                      item.id ===
                      LocalStorageService.get<string>(
                        LocalStorageService.LANGUAGE,
                      ),
                  )?.label || EnFlag
                }
                width={32}
                height={32}
                className="flag"
                style={{ cursor: 'pointer' }}
                onClick={() => setOpenLanguage(true)}
              />
            </Popover>
          </Space>
          <Space>
            <Avatar
              size="large"
              icon={<UserOutlined />}
              style={{ cursor: 'pointer' }}
            />
            <Typography.Text>Username</Typography.Text>
          </Space>
        </Space>
      </Space>
    </Header>
  );
};

export default Header;
