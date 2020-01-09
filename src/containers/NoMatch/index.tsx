import React from 'react';
import { Button } from 'antd';

import './style.less';

function NoMatch() {
    return (
        <div className='no-match'>
            <Button>暂无匹配页</Button>
        </div>
    );
}

export default NoMatch;