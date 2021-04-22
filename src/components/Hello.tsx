import React, {useRef, useState} from 'react';
import {Button, Input, List, message} from 'antd';

import { Stack } from '../uilts/Stack';
import { Tools } from "../uilts/tools";
import {HistoryOutlined} from "@ant-design/icons/lib";

export default function Hello() {
  const [result, setResult] = useState(0);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState([]);
  const historyRef = useRef();
  historyRef.current = history
  function setChange(event: any) {
    let value = event.target.value;
    setValue(value)
  }
  // 中缀转后缀表达式

  // 计算结果
  function calculate() {
    //初始化
    let str = value.trim();
    str = str.trim();
    str = str.replace(/\s/g,"");
    str = str.replace(/。/g, '.');
    str = str.replace(/=/g, '');
    if(str == ''){
      message.warning('先输入表达式撒!');
      return;
    }
    let calcArray = Tools.conversionExpression(str);
    let res = Tools.calcExpression(calcArray);
    console.log(res)
    if(res === false){
      message.warning('除数不能为0!');
      return;
    }
    // @ts-ignore
    res= Tools.BASEisNotNum(res) ? res.toFixed(2): res;
    setResult(res);
    let his = {
      str : str,
      res : res,
    };
    setHistory(() => {
      let temp = historyRef.current;
      temp.push(his);
      return [...temp];
    });
  }
  function deleteHistory(key) {
    console.log(historyRef.current)
    setHistory(() => {
      let temp = historyRef.current
      temp.splice(key, 1)
      return [...temp];
    });
  }
  function onKeyDownChange(e) {
    if(e.keyCode == 13){
      calculate();
    }
  }
  return (
    <div>
      <div className="Hello">
        <Input
          placeholder="输入表达式,如(3 + 4) * 5 - 6/2"
          onChange={(event) => {
            setChange(event);
          }}
          onKeyDown={(e) => {
            onKeyDownChange(e)
          }}
        />
        <div>
          计算结果:
          {result}
        </div>
        <Button type="primary" onClick={calculate}> 点击计算 </Button>
        <div>
          历史记录<HistoryOutlined />:
        </div>
        <div>
          <List

            bordered
            dataSource={history}
            renderItem={(item,key) => (
              <List.Item
              >
                表达式:{ item.str }
                结果:{ item.res }
                <a key="list-delete" style={{color:"red"}} onClick={() => {
                  deleteHistory(key)
                }}>刪除</a>
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
}
