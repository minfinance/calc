import React, { Component } from 'react';
import './App.css';
import numeral from 'numeral';

import {compute} from './lib/compute';
import {inflationRate} from './lib/calc';

import { Form, Container, Table, Header, Message, List } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const gainOptions = [0,1,3,5,7,10,15].map( i => ({ key: i, text: `${i}%`, value: i }) )
const afterWorkGainOptions = [0,1,2,3,5,7,10].map( i => ({ key: i, text: `${i}%`, value: i }) )

function format(value) {
  if(value !== undefined && !isNaN(value)) {
    return numeral(value).format('0,0')
  } else {
    return "-"
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    let initialState = {
      initialSavings: 100000,
      fromAge: 25,
      workTillAge: 55,
      growthPercent: 5,
      afterWorkGrowthPercent: 1,
      monthlyExpense: 40000,
      toAge: 85,
      computed: {}
    };
    let intialStateWithComputed = Object.assign({}, initialState, {computed: compute(initialState)})
    this.state = intialStateWithComputed
  }

  setAndCompute = (key,value) => {
    let newState = Object.assign({}, this.state, {[key]: value})
    let newStateWithComputed = Object.assign({}, newState, {computed: compute(newState)})

    this.setState(newStateWithComputed); 
  }
  handleValueChange = (e) => { this.setAndCompute(e.target.name, e.target.value) };
  handleGrowthPercentChange = (e, {value}) => { this.setAndCompute("growthPercent", value) }
  handleAfterWorkGrowthPercent = (e, {value}) => { this.setAndCompute("afterWorkGrowthPercent", value) }

  render() {
    return (
      <Container>
        <Header as='h1'>คำนวณเงินเก็บ</Header>
        <Form>
          <Form.Group widths='equal'>
            <Form.Input label='อายุปัจจุบัน' control='input' type='number' name="fromAge" onChange={this.handleValueChange} value={this.state.fromAge}/>
            <Form.Input label='ทำงานถึงอายุ' max={99} control='input' type='number' name="workTillAge" onChange={this.handleValueChange} value={this.state.workTillAge}/>
            <Form.Input label='ใช้เงินจนถึงอายุ' control='input' type='number' name="toAge" onChange={this.handleValueChange} value={this.state.toAge} />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input label='เงินเก็บปัจจุบัน' control='input' type='number' name="initialSavings" onChange={this.handleValueChange} value={this.state.initialSavings}/>
            <Form.Select label='ผลตอบแทนการลงทุนเงินเก็บ' options={gainOptions} name="growthPercent" onChange={this.handleGrowthPercentChange} value={this.state.growthPercent}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input label='ใช้เงินต่อเดือน' control='input' type='number' name="monthlyExpense" onChange={this.handleValueChange} value={this.state.monthlyExpense}/>
            <Form.Select label='ผลตอบแทนการลงทุนเงินเก็บหลังทำงาน' options={afterWorkGainOptions} name="afterWorkGrowthPercent" onChange={this.handleAfterWorkGrowthPercent} value={this.state.afterWorkGrowthPercent}/>
          </Form.Group>
        </Form>
          <Message>
        <Message.Header>แปลว่า</Message.Header>
          <Message.List>
            <Message.Item>จะต้องทำงานไปอีก {this.state.computed.yearsToWork} ปี</Message.Item>
            <Message.Item>หลังจากนั้นต้องใช้เงินที่เก็บมาไปอีก {this.state.computed.spendingYears} ปี</Message.Item>
            <Message.Item>ก็เลยต้องเก็บเงินเดือนละ {format(this.state.computed.savingsPerMonth)} บาท ถึงจะพอใช้</Message.Item>
          </Message.List>
        </Message>
        ติดตามเรื่องลงทุนแบบมินิมัลลิสต์ง่ายๆได้ต่อที่เพจ <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/minimalistfinance">Minimalist Finance</a>
        <Header as='h2'>ตารางเก็บเงิน</Header>
        เงินแต่ละปี = เงินเก็บต้นปีที่แล้ว + ดอกเบี้ยจากเงินเก็บต้นปีที่แล้ว + เงินเก็บต่อปี
        <Table unstackable compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>อายุ</Table.HeaderCell>
              <Table.HeaderCell>เงินเก็บต้นปี</Table.HeaderCell>
              <Table.HeaderCell>เก็บเงินเพิ่มเดือนละ</Table.HeaderCell>
              <Table.HeaderCell>x 12 เป็นเงินเก็บเพิ่มปีละ</Table.HeaderCell>
              <Table.HeaderCell>ดอกเบี้ยจากการลงทุน {this.state.growthPercent}%</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { this.state.computed.savings.map( (l) => 
              <Table.Row key={l.year}>
                <Table.Cell>{l.year}</Table.Cell>
                <Table.Cell>{format(l.yearStart)}</Table.Cell>
                <Table.Cell>{format(l.savingsPerYear/12)}</Table.Cell>
                <Table.Cell>{format(l.savingsPerYear)}</Table.Cell>
                <Table.Cell>{format(l.interest)}</Table.Cell>
              </Table.Row>
              )
            }
          </Table.Body>
        </Table>
        <Header as='h2'>ตารางการใช้เงิน</Header>
        ตามที่วางแผนไว้ 
        <List bulleted>
          <List.Item>จะใช้เงินเดือนละ {format(this.state.monthlyExpense)} บาท</List.Item>
          <List.Item>แต่เงินเฟ้อทุกปี ปีละ {numeral(inflationRate * 100).format('0,0.2')} %</List.Item>
          <List.Item>เลยต้องคิด future value เป็นใช้เดือนละ {format(this.state.computed.spendings[0].expense/12)} บาท ในปีแรก</List.Item>
          <List.Item>และต้องปรับเพิ่มเงินที่ใช้แต่ละเดือน ตามอัตราเงินเฟ้อทุกปี</List.Item>
        </List>
        เงินแต่ละปี = (เงินเก็บต้นปีที่แล้ว - ค่าใช้จ่ายต่อปีที่ปรับตามเงินเฟ้อ) เอาที่เหลือไปลงทุน
        <Table unstackable compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>อายุ</Table.HeaderCell>
              <Table.HeaderCell>เงินเก็บต้นปี</Table.HeaderCell>
              <Table.HeaderCell>ใช้เดือนละ</Table.HeaderCell>
              <Table.HeaderCell>x 12 เป็นใช้ปีละ</Table.HeaderCell>
              <Table.HeaderCell>ดอกเบี้ยการลงทุนเงินเก็บที่เหลือ {format(this.state.afterWorkGrowthPercent)}% </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { this.state.computed.spendings.map( (l) => 
              <Table.Row key={l.year}>
                <Table.Cell>{l.year}</Table.Cell>
                <Table.Cell>{format(l.yearStart)}</Table.Cell>
                <Table.Cell>{format(l.expense/12)}</Table.Cell>
                <Table.Cell>{format(l.expense)}</Table.Cell>
                <Table.Cell>{format(l.interest)}</Table.Cell>
              </Table.Row>
              )
            }
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

export default App;
