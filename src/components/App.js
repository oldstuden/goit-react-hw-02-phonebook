import { Component } from 'react';
import { nanoid } from 'nanoid';
import { GlobalStyle } from './GlobalStyle';
import { ListContact } from './ListContact';
import { UserForm } from './UserForm';
import { Filter } from './FilterContact';

const initialValue = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  name: '',
  number: '',
  filter: '',
};

export class App extends Component {
  state = { ...initialValue };

  handleSubmit = (values, { resetForm }) => {
    const { name, number } = values;
    const { contacts } = this.state;
    const isContact = contacts.some(
      contact => contact.name === name && contact.number === number
    );

    if (isContact) {
      alert(`${name} already exists.`);
      resetForm();
      return;
    }
    const newContact = {
      name: values.name,
      number: values.number,
      id: nanoid(),
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
      name: '',
      number: '',
    }));
    resetForm();
  };

  changeFilter = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  filteredContacts = () => {
    const { filter, contacts } = this.state;
    const lcFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lcFilter)
    );
  };

  onDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };
  render() {
    const { filter } = this.state;
    return (
      <div>
        <h1>Phone book</h1>
        <UserForm initialValue={this.state} handleSubmit={this.handleSubmit} />
        <h2>Contacts</h2>
        <Filter value={filter} changeFilter={this.changeFilter} />
        <ListContact
          filter={this.filteredContacts()}
          onDeleteContact={this.onDeleteContact}
        />
        <GlobalStyle />
      </div>
    );
  }
}
