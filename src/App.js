import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';
import numeral from 'numeral';

import {entries} from './lib/calc';

import { Form, Container, Table, Header, Message } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const currentYear = new Date().getFullYear();
const gainOptions = [3,5,7,11,15].map( i => ({ key: i, text: `${i}%`, value: i }) )

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialSavings: 0,
      fromAge: 33,
      yearsToWork: 20,
      growthPercent: 5,
      monthlyExpense: 40000,
      toAge: 80,
    };
  }

  getRemainingYears = () => parseInt(this.state.toAge) - parseInt(this.state.yearsToWork) - parseInt(this.state.fromAge);
  getWorkTillYear = () => parseInt(this.state.yearsToWork) + parseInt(this.state.fromAge);

  handleValueChange = (e) => { this.setState({[e.target.name]: e.target.value}) };
  handleDropdownChange = (e, {value}) => { this.setState({growthPercent: value}) };

  render() {
    return (
      <Container>
        <Header as='h1'>คำนวณเงินเก็บ</Header>
        <Form>
          <Form.Group widths='equal'>
            <Form.Input label='อายุ' control='input' type='number' name="fromAge" onChange={this.handleValueChange} value={this.state.fromAge}/>
            <Form.Input label='จำนวนปีทำงานต่อ' max={99} control='input' type='number' name="yearsToWork" onChange={this.handleValueChange} value={this.state.yearsToWork}/>
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
            <Message.Item>คุณจะเลิกทำงานเมื่ออายุ {this.getWorkTillYear()} ปี</Message.Item>
            <Message.Item>และต้องใช้เงินเก็บยาวไป {this.getRemainingYears()} ปี</Message.Item>
          </Message.List>
        </Message>
        <Header as='h2'>รายละเอียด</Header>
        <Header as='h3'>เก็บเงิน</Header>
        <Table unstackable compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ปี</Table.HeaderCell>
              <Table.HeaderCell>ต้นปี</Table.HeaderCell>
              <Table.HeaderCell>ต่อเดือน</Table.HeaderCell>
              <Table.HeaderCell>ต่อปี</Table.HeaderCell>
              <Table.HeaderCell>ปลายปี</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { entries(this.state).map( (l) => 
              <Table.Row key={l.year}>
                <Table.Cell>{l.year}</Table.Cell>
                <Table.Cell>{numeral(l.yearStart).format('0,0')}</Table.Cell>
                <Table.Cell>{numeral(l.expense/12).format('0,0')}</Table.Cell>
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
