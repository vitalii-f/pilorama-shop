import { Button } from '@mui/material';
import Link from 'next/link';
import { menuList } from './MenuItems';

const DesktopMenu = () => {
  return (
    <>
      {menuList.map((item, index) => (
        <Button
          key={item.name + index}
          sx={{
            padding: '0',
            my: 2,
            display: 'block',
            color: 'black',
            a: {
              display: 'inline-block',
              width: '100%',
              height: '100%',
              padding: 1,
            },
          }}
        >
          <Link href={item.link}>{item.name}</Link>
        </Button>
      ))}
    </>
  );
};

export default DesktopMenu;
