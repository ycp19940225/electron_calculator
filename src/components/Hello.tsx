import React, {useState} from 'react';
import {Button, Input} from 'antd';

import { Stack } from '../uilts/Stack';
import { Tools } from "../uilts/tools";

export default function Hello() {
  const [result, setResult] = useState(0);
  const [value, setValue] = useState('');

  function setChange(event: any) {
    let value = event.target.value;
    setValue(value)
  }
  // 中缀转后缀表达式

  // 计算结果
  function calculate() {
    let calcArray = Tools.conversionExpression(value.trim());
    // @ts-ignore
    setResult(value);
  }

  return (
    <div>
      <div className="Hello">
        <Input
          placeholder="输入表达式"
          onChange={(event) => {
            setChange(event);
          }}
        />
        <div>
          计算结果:
          {result}
        </div>
        <Button type="primary" onClick={calculate}> submit </Button>
      </div>
    </div>
  );
}
