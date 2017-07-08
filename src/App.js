import React, { Component } from 'react';
import './App.css';
import numeral from 'numeral';

import {compute} from './lib/compute';

import { Form, Container, Table, Header, Message } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const gainOptions = [0,1,3,5,7,10,15].map( i => ({ key: i, text: `${i}%`, value: i }) )

class App extends Component {
  constructor(props) {
    super(props);
    let initialState = {
      initialSavings: 500000,
      fromAge: 33,
      workTillAge: 55,
      growthPercent: 5,
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
  handleDropdownChange = (e, {value}) => { this.setAndCompute("growthPercent", value) }

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
            <Form.Select label='ผลตอบแทนการลงทุนเงินเก็บ' options={gainOptions} name="growthPercent" onChange={this.handleDropdownChange} value={this.state.growthPercent}/>
            <Form.Input label='ใช้เงินต่อเดือน' control='input' type='number' name="monthlyExpense" onChange={this.handleValueChange} value={this.state.monthlyExpense}/>
          </Form.Group>
        </Form>
          <Message>
        <Message.Header>แปลว่า</Message.Header>
          <Message.List>
            <Message.Item>จะต้องทำงานไปอีก {this.state.computed.yearsToWork} ปี</Message.Item>
            <Message.Item>หลังจากนั้นต้องใช้เงินที่เก็บมาไปอีก {this.state.computed.spendingYears} ปี</Message.Item>
            <Message.Item>ก็เลยต้องเก็บเงินเดือนละ {numeral(this.state.computed.savingsPerMonth).format('0,0')} บาท ถึงจะพอใช้</Message.Item>
          </Message.List>
        </Message>
        <Header as='h2'>ตารางเก็บเงิน</Header>
        <Table unstackable compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>อายุ</Table.HeaderCell>
              <Table.HeaderCell>เงินเก็บต้นปี</Table.HeaderCell>
              <Table.HeaderCell>เก็บเงินเพิ่มเดือนละ</Table.HeaderCell>
              <Table.HeaderCell>รวมเป็นเงินเก็บเพิ่มปีละ</Table.HeaderCell>
              <Table.HeaderCell>ดอกเบี้ยจากการลงทุน {this.state.growthPercent}%</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { this.state.computed.savings.map( (l) => 
              <Table.Row key={l.year}>
                <Table.Cell>{l.year}</Table.Cell>
                <Table.Cell>{numeral(l.yearStart).format('0,0')}</Table.Cell>
                <Table.Cell>{numeral(l.savingsPerYear/12).format('0,0')}</Table.Cell>
                <Table.Cell>{numeral(l.savingsPerYear).format('0,0')}</Table.Cell>
                <Table.Cell>{numeral(l.interest).format('0,0')}</Table.Cell>
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
