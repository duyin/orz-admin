/*
 * @Author: 杜印 m18612326243@163.com
 * @Date: 2022-11-30 11:56:37
 * @LastEditors: 杜印 m18612326243@163.com
 * @LastEditTime: 2022-12-02 14:05:33
 * @FilePath: /orz-admin-websit/src/mock/user/menu.mock.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { MenuList } from '@/interface/layout/menu.interface';
import { mock, intercepter } from '../config';

const mockMenuList: MenuList = [
  {
    code: 'dashboard',
    label: {
      zh_CN: '首页',
      en_US: 'Dashboard',
    },
    icon: 'dashboard',
    path: '/dashboard',
  },
];

mock.mock('/user/menu', 'get', intercepter(mockMenuList));
