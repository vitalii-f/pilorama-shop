import { Skeleton } from '@mui/material';
import {
  Card,
  CardContent,
  CardDescription,
  CardDeveloper,
  CardTitle,
  Cards,
} from './page.styled';

const loading = () => {
  return (
    <Cards>
      {[...Array(10).keys()].map((key) => (
        <Card key={key}>
          <Skeleton width={170} height={170} />
          <CardContent>
            <CardDescription>
              <CardTitle>
                <Skeleton width={70} height={20} />
              </CardTitle>
              <CardDeveloper>
                <Skeleton width={50} height={20} />
              </CardDeveloper>
            </CardDescription>
            <Skeleton width={30} height={20} />
            <Skeleton width={150} height={20} />
          </CardContent>
        </Card>
      ))}
    </Cards>
  );
};

export default loading;
