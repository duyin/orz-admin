/*
 * @Author: 杜印 m18612326243@163.com
 * @Date: 2022-11-30 11:56:37
 * @LastEditors: 杜印 m18612326243@163.com
 * @LastEditTime: 2022-12-02 13:45:24
 * @FilePath: /orz-admin-websit/src/pages/layout/menu.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { FC } from 'react';
import { Menu } from 'antd';
import { MenuList } from '../../interface/layout/menu.interface';
import { useNavigate } from 'react-router-dom';
import { CustomIcon } from './customIcon';
import { useDispatch, useSelector } from 'react-redux';
import { setUserItem } from '@/stores/user.store';

interface MenuProps {
  menuList: MenuList;
  openKey?: string;
  onChangeOpenKey: (key?: string) => void;
  selectedKey: string;
  onChangeSelectedKey: (key: string) => void;
}

const MenuComponent: FC<MenuProps> = props => {
  const { menuList, openKey, onChangeOpenKey, selectedKey, onChangeSelectedKey } = props;
  const { device, locale } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(menuList, 'menuList');
  const getTitle = (menu: MenuList[0]) => {
    return (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <CustomIcon type={menu.icon!} />
        <span>{menu.label[locale]}</span>
      </span>
    );
  };

  const onMenuClick = (path: string) => {
    onChangeSelectedKey(path);
    navigate(path);
    if (device !== 'DESKTOP') {
      dispatch(setUserItem({ collapsed: true }));
    }
  };

  const onOpenChange = (keys: string[]) => {
    const key = keys.pop();

    onChangeOpenKey(key);
  };

  return (
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]}
      openKeys={openKey ? [openKey] : []}
      onOpenChange={onOpenChange}
      onSelect={k => onMenuClick(k.key)}
      className="layout-page-sider-menu text-2"
      items={menuList.map(menu => {
        return menu.children
          ? {
              key: menu.code,
              label: getTitle(menu),
              children: menu.children.map(child => ({
                key: child.path,
                label: child.label[locale],
              })),
            }
          : {
              key: menu.path,
              label: getTitle(menu),
            };
      })}
    ></Menu>
  );
};

export default MenuComponent;
