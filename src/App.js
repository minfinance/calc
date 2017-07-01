import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';

import {savings} from './lib/calc';

import { Form, Container, Table, Header, Message } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const currentYear = new Date().getFullYear();
const gainOptions = _.range(1,11).map( i => ({ key: i, text: `${i}%`, value: i }) )
const savingYears = _.range(1,16);

const savingList = savings(10, 20000 * 12, 2 * 0.01)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSavings: 100000,
      yearsToWork: 25,
      growthPercent: 5,
      monthlyAllowance: 40000,
      tillAge: 80,
    };
  }

  getRemainingYears = () => this.state.tillAge - this.state.yearsToWork;
  handleValueChange = (e) => { this.setState({[e.target.name]: e.target.value}) };
  handleDropdownChange = (e, {value}) => { this.setState({growthPercent: value}) };

  render() {
    return (
      <Container>
        <Header as='h1'>คำนวณเงินเก็บ</Header>
        <Form>
          <Form.Group widths='equal'>
            <Form.Input label='เงินเก็บปัจจุบัน' control='input' type='number' name="currentSavings" onChange={this.handleValueChange} value={this.state.currentSavings}/>
            <Form.Input label='จำนวนปีทำงานต่อ' control='input' type='number' name="yearsToWork" onChange={this.handleValueChange} value={this.state.yearsToWork}/>
            <Form.Select label='ผลตอบแทนการลงทุนเงินเก็บ' options={gainOptions} name="growthPercent" onChange={this.handleDropdownChange} value={this.state.growthPercent}/>
            <Form.Input label='ใช้เงินต่อเดือน' control='input' type='number' name="monthlyAllowance" onChange={this.handleValueChange} value={this.state.monthlyAllowance}/>
            <Form.Input label='ใช้เงินจนถึงอายุ' control='input' type='number' name="tillAge" onChange={this.handleValueChange} value={this.state.tillAge} />
          </Form.Group>
        </Form>
          <Message>
        <Message.Header>จากข้อมูลที่ให้มา</Message.Header>
          <Message.List>
            <Message.Item>คุณต้องใช้เงินเก็บยาวไป {this.getRemainingYears()} ปี</Message.Item>
            <Message.Item>แปลว่าต้องเก็บเงินเดือนละ {100} บาท</Message.Item>
          </Message.List>
        </Message>
        <Header as='h2'>รายละเอียด</Header>
        <Header as='h3'>เก็บเงิน</Header>
        <Table unstackable compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ปี</Table.HeaderCell>
              <Table.HeaderCell>เงินเก็บต้นปี</Table.HeaderCell>
              <Table.HeaderCell>เงินเก็บปลายปี</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { savingList.map( (l) => 
              <Table.Row key={l.year}>
                <Table.Cell>{l.year}</Table.Cell>
                <Table.Cell>{l.yearStart}</Table.Cell>
                <Table.Cell>{l.yearEnd}</Table.Cell>
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
