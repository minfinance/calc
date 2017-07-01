import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';

import { Form, Container, Table, Header } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const currentYear = new Date().getFullYear();
const gainOptions = _.range(1,11).map( i => ({ key: i, text: `${i}%`, value: i }) )
const savingYears = _.range(1,16);

class App extends Component {
  render() {
    return (
      <Container>
        <Header as='h1'>First Header</Header>
        <Form>
          <Form.Group widths='equal'>
            <Form.Input label='จำนวนปี' control='input' type='number' value={15}/>
            <Form.Select label='ผลตอบแทนต่อปี' options={gainOptions} value={2}/>
            <Form.Input label='เงินต่อเดือน' control='input' type='number' value={20000}/>
            <Form.Input label='ใช้ถึงปี' control='input' type='number' value={90} />
          </Form.Group>
        </Form>
        <Header as='h2'>เก็บเงิน</Header>
        <Table unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ปี</Table.HeaderCell>
              <Table.HeaderCell>เงินเก็บต้นปี</Table.HeaderCell>
              <Table.HeaderCell>เงินเก็บปลายปี</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { savingYears.map( (y) => 
              <Table.Row key={y}>
                <Table.Cell>{y}</Table.Cell>
                <Table.Cell>0</Table.Cell>
                <Table.Cell>0</Table.Cell>
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
