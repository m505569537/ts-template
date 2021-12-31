import React from "react";
import { Button } from 'antd';

import Nav from './nav';
import s from './index.less';

interface IProps {

}

const App: React.FC<IProps> = (props) => {
  return (
    <div className={s.div}>
      <Nav />
      <Button type='primary'>hhh</Button>
    </div>
  )
}

export default App;