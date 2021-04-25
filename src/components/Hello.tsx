import React, {useEffect, useRef, useState} from 'react';
import {Button, Input, List, message} from 'antd';

import { Stack } from '../uilts/Stack';
import { Tools } from "../uilts/tools";
import {HistoryOutlined} from "@ant-design/icons/lib";

export default function Hello() {
  const [result, setResult] = useState(0);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState([]);
  const historyRef = useRef();
  historyRef.current = history;
  function setChange(event: any) {
    let value = event.target.value;
    setValue(value)
  }
  useEffect(function () {
    try {
      const info = JSON.parse(localStorage.getItem('history')); //
      setHistory(info);
    }catch (e) {

    }
  },[]);
  useEffect(function () {
    localStorage.setItem('history', JSON.stringify(history)); //
  },[history]);
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
      temp.unshift(his);
      return [...temp];
    });
  }
  function deleteHistory(key) {
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
  function clearAll() {
    setHistory([])
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
        <div className="result">
          计算结果:&nbsp;&nbsp;
          {result}
        </div>
        <div className="hand_box">
          <Button type="primary" onClick={calculate}> 点击计算 </Button>
        </div>
        <div className='record'>
          历史记录<HistoryOutlined />:  &nbsp;&nbsp;<Button type="primary" danger size='small' onClick={() => {clearAll()}}>清除记录</Button>
        </div>
        <div className="record_list">
          <List

            bordered
            dataSource={history}
            renderItem={(item,key) => (
              <List.Item
              >
               <div className="item">
                 <div>
                   表达式:{ item.str }
                 </div>
                 <div>
                   结果:{ item.res }
                 </div>
                 <div>
                   <a key="list-delete" style={{color:"red"}} onClick={() => {
                     deleteHistory(key)
                   }}>刪除</a>
                 </div>
               </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
}
