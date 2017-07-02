import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';
import numeral from 'numeral';

import {entries} from './lib/calc';

import { Form, Container, Table, Header, Message } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const currentYear = new Date().getFullYear();
const gainOptions = _.range(1,11).map( i => ({ key: i, text: `${i}%`, value: i }) )
const savingYears = _.range(1,16);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialSavings: 100000,
      fromAge: 33,
      yearsToWork: 20,
      growthPercent: 5,
      monthlyExpense: 40000,
      toAge: 80,
    };
  }

  getRemainingYears = () => this.state.toAge - this.state.yearsToWork - this.state.fromAge;
  getWorkTillYear = () => this.state.yearsToWork + this.state.fromAge;

  handleValueChange = (e) => { this.setState({[e.target.name]: e.target.value}) };
  handleDropdownChange = (e, {value}) => { this.setState({growthPercent: value}) };

  render() {
    return (
      <Container>
        <Header as='h1'>คำนวณเงินเก็บ</Header>
        <Form>
          <Form.Group widths='equal'>
            <Form.Input label='เงินเก็บปัจจุบัน' control='input' type='number' name="initialSavings" onChange={this.handleValueChange} value={this.state.initialSavings}/>
            <Form.Input label='อายุ' control='input' type='number' name="fromAge" onChange={this.handleValueChange} value={this.state.fromAge}/>
            <Form.Input label='จำนวนปีทำงานต่อ' max={99} control='input' type='number' name="yearsToWork" onChange={this.handleValueChange} value={this.state.yearsToWork}/>
            <Form.Select label='ผลตอบแทนการลงทุนเงินเก็บ' options={gainOptions} name="growthPercent" onChange={this.handleDropdownChange} value={this.state.growthPercent}/>
            <Form.Input label='ใช้เงินต่อเดือน' control='input' type='number' name="monthlyExpense" onChange={this.handleValueChange} value={this.state.monthlyExpense}/>
            <Form.Input label='ใช้เงินจนถึงอายุ' control='input' type='number' name="toAge" onChange={this.handleValueChange} value={this.state.toAge} />
          </Form.Group>
        </Form>
          <Message>
        <Message.Header>จากที่ใส่ข้อมูล แปลว่า</Message.Header>
          <Message.List>
            <Message.Item>ต้องเก็บเงินเดือนละ {100} บาท</Message.Item>
            <Message.Item>คุณจะเลิกทำงานเมื่ออายุ {this.getWorkTillYear()} ปี</Message.Item>
            <Message.Item>ตอนเลิกทำงานต้องมีเงิน {100} บาท</Message.Item>
            <Message.Item>และต้องใช้เงินเก็บยาวไป {this.getRemainingYears()} ปี</Message.Item>
          </Message.List>
        </Message>
        <Header as='h2'>รายละเอียด</Header>
        <Header as='h3'>เก็บเงิน</Header>
        <Table unstackable compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ปี</Table.HeaderCell>
              <Table.HeaderCell>รายได้/ค่าใช้จ่าย</Table.HeaderCell>
              <Table.HeaderCell>เงินเก็บ</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { entries(this.state).map( (l) => 
              <Table.Row key={l.year}>
                <Table.Cell>{l.year}</Table.Cell>
                <Table.Cell>{numeral(l.expense).format('0,0')}</Table.Cell>
                <Table.Cell>{numeral(l.yearEnd).format('0,0')}</Table.Cell>
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
